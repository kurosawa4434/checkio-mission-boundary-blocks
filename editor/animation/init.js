//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function boundaryBlocksCanvas(dom, data) {
            if (! data || ! data.ext) {
                return
            }

            const result = data.ext.result
            const output = data.out

            const grid = data.in[0]
            const width = grid[0].length
            const height = grid.length

            /*----------------------------------------------*
             *
             * paper
             *
             *----------------------------------------------*/
            const max_width = 350
            const os = 10
            const SIZE = (max_width - os*2)
                / Math.max(...[4, width, height])
            const paper = Raphael(
                dom,Math.min(max_width, SIZE*width+os*2),
                SIZE*height+os*2, 0, 0)

            /*----------------------------------------------*
             *
             * attr
             *
             *----------------------------------------------*/
            const attr = {
                grid: {
                    empty: {
                        'stroke': '#2080B8',
                    },
                    block: {
                        'stroke': '#2080B8',
                        'fill': '#8FC7ED',
                    },
                    boundary_block: {
                        'stroke': '#2080B8',
                        'fill': "#4094C7",
                    },
                },
            }

            /*----------------------------------------------*
             *
             * draw grid
             *
             *----------------------------------------------*/
            const cell_dic = {}
            for (let r = 0; r < height; r += 1) {
                for (let c = 0; c < width; c += 1) {
                    const cell = paper.rect(SIZE*c+os, 
                        SIZE*r+os, SIZE, SIZE)
                    if (grid[r][c] === 'X') {
                        cell.attr(attr.grid.block)
                    } else {
                        cell.attr(attr.grid.empty)
                    }
                    cell_dic[r*100+c] = cell
                }
            }

            /*----------------------------------------------*
             *
             * transition the color of boundary blocks
             *
             *----------------------------------------------*/
            if (result) {
                output.forEach(([r, c])=>{
                    cell_dic[r*100+c].animate(
                        attr.grid.boundary_block, 1000)
                })
            }
        }

        var $tryit;

        var io = new extIO({
            multipleArguments: true,
            functions: {
                python: 'boundary_blocks',
                js: 'boundaryBlocks'
            },
            animation: function($expl, data){
                boundaryBlocksCanvas(
                    $expl[0],
                    data,
                );
            }
        });
        io.start();
    }
);
