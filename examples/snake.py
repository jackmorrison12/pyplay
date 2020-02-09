import random

lost = False
direction = 0
n_direction = 0
canvas = getCanvas()
# 0 right, 1 down, 2 left, 3 up
"""
====================================

STEP 1: Define the Snake as an array of tuples

Hint: each tuple has 2 elements

====================================

"""

snake = [(0, 0), (1, 0), (2, 0)]

"""
====================================

STEP 2: Wrtie a function to put the fruit at a random point on the map

Hint: The fruit should be placed at random locations

====================================
"""

def randpos():
  pos = None
  while True:
    x = random.randint(0, 39)
    y = random.randint(0, 39)
    pos = (x, y)
    if not (pos in snake):
      break
  return pos

fruit = randpos()

"""
====================================

STEP 3: Write a function to move the snake based on the input

Hint: When the snake moves, rectangle at the head moves forward by one
but rectangle at tail also gets deleted

====================================
"""

def event():
  global lost, snake, fruit, direction, n_direction
  direction = n_direction
  if lost:
    return
  (x, y) = snake[-1]
  if direction == 0:
    x += 1
  elif direction == 1:
    y += 1
  elif direction == 2:
    x -= 1
  else:
    y -= 1
    
  npos = (x, y)
  if x < 0 or x >= 40 or y < 0 or y >= 40 or (npos in snake and npos != snake[0]):
    lost = True
    return

  snake.append(npos)
  
  if npos == fruit:
  	fruit = randpos()
  else:
  	snake.pop(0)
  
  canvas.clear()
  for (a, b) in snake:
    canvas.fillRect(a * 10, b * 10, 10, 10, '#00ff00')
  canvas.fillRect(fruit[0] * 10, fruit[1] * 10, 10, 10, '#ffff00')
    
setInterval(150, event)

"""
====================================

STEP 4: Write a function to track where the user is clicking 

====================================
"""

def handler(t):
  global direction, n_direction
  if t == 38 and direction != 1:
    n_direction = 3
  elif t == 40 and direction != 3:
    n_direction = 1
  elif t == 37 and direction != 0:
    n_direction = 2
  elif t == 39 and direction != 2:
    n_direction = 0

setKeyHandler(handler)
