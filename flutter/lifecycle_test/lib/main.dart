import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  MyApp({super.key}) {
    super.key;

    debugPrint('--------- 순서 ---------- 1');
  }

  @override
  State<StatefulWidget> createState() {
    debugPrint('--------- 순서 ---------- 2');

    return _MyAppState();
  }
}

class _MyAppState extends State<MyApp> {
  Future<void> add() async {
    await Future.delayed(const Duration(seconds: 1));
    debugPrint('add 메서드 호출');
  }

  @override
  void initState() {
    super.initState();

    debugPrint(' ---------- 순서 3');
    debugPrint('상태값을 초기화 하는데 보통 사용');
    debugPrint('Context가 생성되기 전에 호출됨');
    debugPrint('한번만 호출되며, 상태가 변경되도 다시 호출되지 않는다. ---------- 3');
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();

    debugPrint(' ---------- 순서 4');
    debugPrint('Context에 접근이 가능하다');
    debugPrint('한번만 호출되며, 상태가 변경되도 다시 호출되지 않는다. ---------- 4');
  }

  @override
  Widget build(BuildContext context) {
    debugPrint(' ---------- 순서 5');
    debugPrint('build 메서드는 컴포넌트를 그리는 메서드, UI를 만들어 내는 함수');
    debugPrint('여러번 호출될 수 있다.');
    debugPrint('상태값이 변경되면 다시 호출된다.');
    debugPrint(' ---------- 5');

    return MaterialApp(
      home: Scaffold(
          body: Row(
        children: [
          Expanded(
              flex: 2,
              child: Container(
                height: 100,
                color: Colors.red,
              )),
          Expanded(
              child: Container(
            height: 100,
            color: Colors.green,
          )),
          Expanded(
              child: Container(
            height: 100,
            color: Colors.blue,
          ))
        ],
      )),
    );
  }
}
