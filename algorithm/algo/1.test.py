
# 입력 Case 1

# 숫자를 입력 받을 때는 int(input())
# number = int(input())

# 문자를 입력 받을 때는 input()
# number2 = input()

# 입력 Case 2

# 1 2 3으로 입력할때
# list1 = list(map(int, input().split()))
# print(list1)

# A B C으로 입력할때
# list2 = list(map(str, input().split()))
# print(*list2)

# 반복문
for number in range(10):
  print(number)

for number in range(5, 10):
  print(number)

number = 0
while number < 5:
  print(number)
  number += 1


# 조건문
name = "버즈"
if name == "버즈":
  print("같다")
else:
  print("아니야")