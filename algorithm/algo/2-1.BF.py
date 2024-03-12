# 3
# 1000036000099
# YES
# 20000000000002
# NO
# 1500035500153
# NO

# TC = int(input())

# for _ in range(TC):
#   number = int(input())

#   for i in range(2, number):
#     if number % i == 0:
#       if i <= 1_000_000:
#         print("NO")
#         break
#       else:
#         print("YES")
#         break
    
      

TC = int(input())

for _ in range(TC):
  number = int(input())

  for i in range(2, 1_000_001):
    if number % i == 0:
      print("NO")
      break

    if i == 1_000_000:
      print("YES")