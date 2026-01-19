import 'package:equatable/equatable.dart';

class A extends Equatable {
  final int value;

  const A(this.value);

  @override
  List<Object?> get props => [value]; // 비교 하고 싶은 변수를 배열에 넣는다.
}

void main() {
  print(A(1) == A(1));
  print(A(1));
}
