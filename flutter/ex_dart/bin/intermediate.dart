import 'dart:convert';

void main() {
  print("hello");

  /** 
   * 객체 비교
   *  - dart는 기본적으로 참조 비교(Reference Equality)를 한다.
   * */
  print("철수" == "철수"); // true
  print([1] == [1]); // false, 가변 객체로 항상 새로운 메모리에 할당

  // 1. 가변(Mutable) 객체
  // 가변 객체는 값이 변경될 수 있으므로 값이 동일해도 새롭게 생성 → 항상 다른 메모리 주소 반환
  // 가변 객체로 List, Set, Map, 커스텀 클래스 등이 있습니다.
  print([1] == [1]);
  print({1} == {1});
  print({"key": 1} == {"key": 1});

  // 2. 불변(Immutable) 객체
  // 불변 객체(Immutable Object)는, 메모리에 할당한 뒤 값을 변경할 수 없는 객체입니다.
  // 불변 객체로 String, int, double, bool, const로 선언된 객체 등이 있습니다.

  // List a = const [];
  // a.add(1); // const로 생성되었기 때문에 수정 불가능
  // 💡const는 컴파일 타임에 고정 값인 객체 앞에만 선언할 수 있습니다.
  print(1 == 1); // true
  print(const [1] == const [1]); // true
  print(const {1} == const {1}); // true
  print(const {"key": 1} == const {"key": 1}); // true

  /**
   * 💡 <aside>
   * Flutter에선 값이 변경되지 않는 위젯은 **const** 키워드를 붙여서 불변 객체로 생성하는게 좋습니다.

   * - 값이 동일한 객체들을 중복 생성하지 않아 **메모리 절약**
   * - 한 번 화면에 그린 뒤 갱신할 필요가 없어 **불필요한 랜더링 최소화**
   * </aside>
   */

  valueEquality();
  immutableObject();
  immutableClass();
  serialization();
}

class A {
  int value;
  A(this.value);

  @override
  String toString() {
    return "A(value: $value)";
  }
}

void valueEquality() {
  print(A(1) == A(1));
  print(A(1));
}

void immutableObject() {
  List<int> a = [1, 2, 3];
  List<int> b = a; // 얕은 복사

  a = [...a, 4];
  print(a == b); // false
  print(a);
  print(b);

  // 3개의 객체 생성 후 개별 참조
  List<int> a1 = [];
  List<int> a2 = [];
  List<int> a3 = [];

  const List<int> b1 = [];
  const List<int> b2 = [];
  const List<int> b3 = [];
}

// 불변 클래스 만들기
// final을 붙혀야 되고, 생성자에 const를 붙혀야 한다.
class ImmutableClass {
  final String name;
  final int age;

  const ImmutableClass({required this.name, required this.age});

  @override
  String toString() {
    return "ImmutableClass(name: $name, age: $age)";
  }
}

void immutableClass() {
  ImmutableClass a = ImmutableClass(name: "buzz", age: 33);
  ImmutableClass b = a;

  a = ImmutableClass(name: "buzz2", age: 36);
  print(a);
  print(b);
}

void serialization() {
  Map<String, dynamic> map = jsonDecode('{"name": "buzz", "age": 33}');
  print(map["name"]);
}
