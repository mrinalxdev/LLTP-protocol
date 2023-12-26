import sys
import time 
import pygame
import random
from itertools import product

fps = 20
cell_width = 3
grid_size = width, height = (500, 500)
screen_size = grid_size[0]*cell_width, grid_size[1]*cell_width

green = 50, 200, 50
black = 0,0, 0


'''Initalizing the Game and display sizes'''

pygame.init()
screen = pygame.display.set_mode(screen_size)

'''Board Function'''
def make_board(width, height, randomize = False):
    if randomize :
        new_board = [
            [random.choice([0, 1]) for y in range(height)]
            for x in range(width)
        ]
    else: 
        new_board = [
            [0 for y in range(height)]
            for x in range(width)
        ]
    return new_board

def get_neighbors(x, y, board):
    neighbours = []
    for delta_x in [-1, 0, 1]:
        for delta_y in [-1, 0, 1]:
            nx = (x + delta_x) % width
            ny = (y + delta_y) % height
            neighbour = board[nx][ny]
            neighbours.append(neighbour)
    return neighbours

def advance(board):
    new_board = make_board(width, height)
    coords = product(range(width), range(height))
    for x, y in coords :
        neighbors = get_neighbors(x, y, board)
        alive_num = sum(neighbors)
        state = board[x][y]

        if state == 1 and alive_num in [2, 3]:
            new_board[x][y] = 1
        
        if state == 0 and alive_num in [3]:
            new_board[x][y] = 1
    return new_board 

prev_update_t = time.time()
board = make_board(width, height, randomize=True)
paused = True
mouse_dragging = False
while 1 : 
    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            if event.type == pygame.K_RETURN:
                paused = not paused
            
        if event.type == pygame.MOUSEBUTTONDOWN:
            x, y = pygame.mouse.get_pos()
            col, row = x//cell_width, y//cell_width

            state = board[col][row]
            board[col][row] = 1
            mouse_dragging = True
        
        if event.type == pygame.MOUSEBUTTONUP:
            mouse_dragging = False
        

        if event.type == pygame.QUIT:
            sys.exit()

    if mouse_dragging:
        x, y = pygame.mouse.get_pos()
        col, row = x//cell_width, y//cell_width
        board[col][row] = 1
    
    if time.time() - prev_update_t < 1/fps:
        continue

    prev_update_t = time.time()
    screen.fill(black)
    if not paused:
        board = advance(board)
    
    for x, y in product(range(width), range(height)):
        coords = ((x + 0.5)* cell_width, (y + 0.5) * cell_width)
        if board[x][y]:
            pygame.draw.circle(screen, green, coords, cell_width/2)
    
    pygame.display.flip()