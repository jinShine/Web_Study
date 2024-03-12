A,B,C,D,E,F = map(int, input().split())

for x in range(-10000, 10000):
  for y in range(-10000, 10000):
    if (A*x) + (B*y) == C and (D*x) + (E*y) == F:
      print(x, y)
      break
