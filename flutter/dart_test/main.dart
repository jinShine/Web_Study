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

  // ** 연산자
  // 연사자는 다른 언어와 동일
  // 다른 언어와 차별점이 있는 조건만 작성
  // 1. null 병합 연산자
  // 2. 삼항 연산자

  // 1. null 병합 연산자
  int? tAge = null;
  print("tAge: ${tAge ?? 1}살");

  // 3. 삼항 연산자
  print("tAge ${tAge == null ? "아직" : "1살"}");

  // ** Switch
  const ColorType ct = ColorType.BLUE;
  switch (ct) {
    case ColorType.RED:
      print("빨강");
      break;
    case ColorType.GREEN:
      print("초록");
      break;
    case ColorType.BLUE:
      print("파랑");
      break;
    default:
      print("기본값");
  }

  // ** 함수
  int add(int a, int b) {
    return a + b;
  }

  print("add: ${add(10, 20)}");

  functions();
}

// ** 패턴 매칭
class StatusType {
  final bool status;
  final String message;

  StatusType({required this.status, required this.message});
}

StatusType isValidForSignup(String nickname) {
  return StatusType(status: false, message: "닉네임을 확인해주세요.");
}

// 굳이 클래스를 이용해서 타입을 만들지 않아도 된다.
// 다트 3.0 이후 추가된 기능
(bool, String) isValidSignup(String nickname) {
  return (false, "닉네임을 확인해주세요.");
}

enum ColorType {
  RED("빨강"),
  GREEN("초록"),
  BLUE("파랑");

  final String color;
  const ColorType(this.color);
}

// ** 함수
void functions() {
  // ** 포지셔닝 파라미터
  // 파라미터를 순서대로 넣어줘야되며, 필수로 차리를 채워야 한다.
  String getUser(String name, int age) {
    return "name: $name, age: $age";
  }

  print("getUser: ${getUser("Buzz", 20)}");

  // ** 네이밍 파라미터
  // 파라미터를 순서대로 넣어줄 필요가 없다.
  // 파라미터 이름을 지정해서 넣어줄 수 있다.
  String getUser2({String? name, int? age}) {
    return "name: $name, age: $age";
  }

  print("getUser2: ${getUser2(name: "Buzz", age: 20)}");
  print("getUser2: ${getUser2(age: 20)}");

  // ** 포지셔닝 + 네이밍 파라미터
  String message(String message, {double? size, int? weight}) {
    return "message: $message, size: $size, weight: $weight";
  }

  print("message: ${message("안녕하세요", size: 10, weight: 100)}");

  // 플러터 위젯은 기본적으로 네이밍 파라미터로 정의되어 있으며, 꼭 필요한 파라미터는 포지셔닝 파라미터로 정의되어 있습니다.
}

// ** 클래스
class Phone {
  static int count = 0;

  final String name;
  final String model;

  Phone({
    required this.name, // required 키워드를 사용하면 반드시 값을 넣어줘야 한다.
    this.model = "iPhone 16",
  });

  // 명명된 생성자(named constructor)
  Phone.skip() : this(name: "아이폰");
}

Phone phone = Phone(name: "아이폰", model: "15");

final phone2 = Phone.skip();
var ddd = phone2.name;

var count = Phone.count++;

// 상속
class Human {
  // Private 변수
  // dart에서는 private, public과 같은 접근제한자를 지원하지 않는다.
  // 변수 앞에 _를 붙이면 private 변수가 된다.
  int _age; // Private 변수
  String name;

  Human({
    required int age, // private 변수
    required this.name,
  }) : _age = age; // Private 변수 초기화 할때는 this 키워드를 사용하지 않는다.

  void walk() {
    _age++;
    print("걷는다");
  }

  int get age => _age;
}

class Father extends Human {
  Father({required super.age, required super.name});

  void takeResponsibility() {
    print("아버지가 가정을 책임진다.");
  }
}

class Mother extends Human {
  Mother({required super.age, required super.name});

  void takeFood() {
    print("어머니가 밥을 준다.");
  }
}

// 추상화
// 추상화는 객체의 공통적인 특성을 추출하여 모델링하는 과정을 말한다.
abstract class Walkable {
  void walk();
}

class Person implements Walkable {
  @override
  void walk() {
    print("걷는다");
  }
}

class Person2 implements Walkable {
  @override
  void walk() {
    print("걷는다");
  }
}

Person person = Person();
Person2 person2 = Person2();

List<Walkable> works = [person, person2];
