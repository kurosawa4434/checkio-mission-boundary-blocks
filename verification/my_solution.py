def boundary_blocks(grid):

    planes = set()
    blocks = set()

    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if grid[r][c] == '.':
                planes.add((r, c))
            elif grid[r][c] == 'X':
                blocks.add((r, c))

    def adj_cells(y, x):
        adj = {(y+dy, x+dx) for dy, dx in [
            (-1, 0), (1, 0), (0, -1), (0, 1)]}
        return adj & planes, adj & blocks

    def get_boundary(co):
        boundary_cells = set()
        plane_cells = next_cells = {co}
        while next_cells:
            search_cells = next_cells
            next_cells = set()
            for y, x in search_cells:
                p, b = adj_cells(y, x)
                next_cells |= p
                boundary_cells |= b
            next_cells -= plane_cells
            plane_cells |= next_cells
        return plane_cells, boundary_cells

    boundarys = []
    while planes:
        co = planes.pop()
        p, b = get_boundary(co)
        boundarys.extend(b)
        planes -= p | {co}

    return map(list, filter(lambda b: boundarys.count(b) > 1, blocks))

