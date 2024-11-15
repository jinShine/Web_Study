void main() {
  // ** 변수
  String name = "BUZZ";
  print("hellow world $name");

  // ** late 변수
  // 변수를 선언할때 초기화하지 않아도, 나중에 초기화 하는 상황에 사용
  late String name1;
  late String name2 = "Buzz2";
  print("hellow world ${name2}");

  // ** final, const
  // 1. final:
  //  - 런타임 상수
  // 2. const:
  //  - 컴파일 상수
  //  - 컴파일 시점에 값이 결정된다.
  final String name3 = "Buzz3";
  const String name4 = "Buzz4";

  // final 리스트 - 리스트 자체는 변경 불가능하지만 내용은 변경 가능
  final List<String> names1 = ['John', 'Jane'];
  names1.add('Jack'); // 가능

  // const 리스트 - 리스트와 내용 모두 변경 불가
  // const List<String> names2 = ['John', 'Jane'];
  // names2.add('Jack'); // 에러!

  print("hellow world ${name3}");
  print("hellow world ${name4}");

  // ** 내장 변수 타입
  // 1. int, double
  // 2. String
  // 3. bool
  // 4. List
  // 5. Map
  // 6. Set
  // 7. enum

  // ** 변환 to~
  int nTest = 1;
  print('nTest: ${nTest.toDouble()}');
  double nTest2 = 1.1;
  print('nTest2: ${nTest2.toInt()}');
  print('nTest2: ${nTest2.toString()}');

  String strTest = "100";
  strTest += "원";
  strTest += """
  (10% 할인)
  """;
  print('strTest: $strTest');
  bool boolTest = true;

  // ** List
  List<String> listTest = ["apple", "banana", "cherry"];
  print('listTest: $listTest');
  listTest.add('orange');
  print('listTest: $listTest');
  listTest.remove("banana");
  print('listTest: $listTest');

  List<String> listTest2 = ["peach", "banana", "cherry"];
  print('listTest merge: ${[...listTest, ...listTest2]}');

  // ** Map
  Map<String, String> mapTest = {
    "red": "#FF0000",
    "green": "#00FF00",
    "blue": "#0000FF"
  };

  mapTest["black"] = "#000000";
  mapTest.remove("red");
  print('mapTest: $mapTest');

  // ** enum
  print('ColorType: ${ColorType.BLUE.color}');
}

enum ColorType {
  RED("빨강"),
  GREEN("초록"),
  BLUE("파랑");

  final String color;
  const ColorType(this.color);
}
