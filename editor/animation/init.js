//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function boundaryBlocksCanvas(dom, data) {
            if (! data || ! data.ext) {
                return
            }

            //$(dom.parentNode).find(".answer").remove()

            const result = data.ext.result
            const output = data.out
            //const result_addon_00 = data.ext.result_addon[0]
            //const result_addon_01 = data.ext.result_addon[1]

            const grid = data.in[0]
            const width = grid[0].length
            const height = grid.length

            /*----------------------------------------------*
             *
             * paper
             *
             *----------------------------------------------*/
            let max_width = 350
            const os = 10
            const SIZE = (max_width - os*2)
                             / Math.max(...[4, width, height])
            max_width = Math.min(350, SIZE*width+os*2)
            const paper = Raphael(dom, max_width, SIZE*height+os*2, 0, 0)

            /*----------------------------------------------*
             *
             * message
             *
             *----------------------------------------------*/
            /*
            if (! result) {
                $(dom).addClass('output').prepend(
                    '<div>' + result_addon_00 + '</div>').css(
                        {'border': '0','display': 'block',})
            }
            */

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
                        'fill': 'orange',
                        'fill': '#faba00',
                        'fill': "#7FBDE5",
                        'fill': "#6FB3DE",
                        'fill': "#5FA9D6",
                        'fill': "#4F9FCF",
                        'fill': "#4094C7",
                    /*
                    "#308AC0",
                    "#2080B8",
                    "#1076B1",
                    "#006CA9",
                    */
                    },
                },
            }

            /*----------------------------------------------*
             *
             * dictionary of boundary blocks
             *
             *----------------------------------------------*/
            const boundary_dic = {}
            output.forEach(o=>{
                const [r, c] = o
                boundary_dic[r*100+c] = 1
            })

            /*----------------------------------------------*
             *
             * draw grid
             *
             *----------------------------------------------*/
            for (let r = 0; r < height; r += 1) {
                for (let c = 0; c < width; c += 1) {
                    const cell = paper.rect(SIZE*c+os, 
                        SIZE*r+os, SIZE, SIZE)
                    if (boundary_dic[r*100+c]) {
                        cell.attr(attr.grid.boundary_block)
                    } else if (grid[r][c] === 'X') {
                        cell.attr(attr.grid.block)
                    } else {
                        cell.attr(attr.grid.empty)
                    }
                }
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
