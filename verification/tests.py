"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""
from random import randint, choice, shuffle
from my_solution import boundary_blocks

randoms = []


def make_randoms(num):
    tests = []
    for _ in range(num):
        height, width = randint(3, 20), randint(3, 20)
        block_num = max(3, randint(height*width//10, height*width//3))
        planes = [(r, c) for r in range(height) for c in range(width)]
        blocks = set()
        for _ in range(block_num):
            while True:
                py, px = choice(planes) 
                adj = {(py+dy, px+dx) for dy, dx in (
                    (-1, 0), (1, 0), (0, -1), (0, 1))}
                if not blocks & adj:
                    blocks.add((py, px))
                    planes.remove((py, px))
                    break

        inp = []
        for r in range(height):
            row = ''.join(['.','X'][(r, c) in blocks] for c in range(width))
            inp.append(row)
        tests.append({'input': [inp], 
            'answer': sorted(boundary_blocks(inp)),})
    return tests


TESTS = {
    "Randoms": make_randoms(10),
    "Basics": [
        {
            'input': [['..X',
                      '.X.', 
                      'X..']],
            'answer': [[0, 2], [1, 1], [2, 0]],
            'explanation': '',
        },
        {
            'input': [['...',
                      '.X.', 
                      'X..']],
            'answer': [],
            'explanation': '',
        },
        {
            'input': [['X.X.',
                       '.X..', 
                       '..X.', 
                       '....']],
            'answer': [[0, 0], [0, 2], [1, 1]],
            'explanation': '',
        },
        {
            'input': [['.....',
                       '..X..', 
                       '.X.X.', 
                       '..X..', 
                       '.....']],
            'answer': [[1, 2], [2, 1], [2, 3], [3, 2]],
            'explanation': '',
        },
        {
            'input': [['.....',
                       '..X..', 
                       '.X.X.', 
                       '..X..', 
                       '.X...']],
            'answer': [[1, 2], [2, 1], [2, 3], [3, 2]],
            'explanation': '',
        },
        {
            'input': [['...X.',
                       '..X..', 
                       '.X.X.', 
                       '..X..', 
                       '.X...']],
            'answer': [[0, 3], [1, 2], [2, 1], [2, 3], [3, 2], [4, 1]],
            'explanation': '',
        },
    ],
}
