import 'package:flutter/material.dart';

class Memo {
  Memo({required this.content});

  final String content;
}

class MemoService extends ChangeNotifier {
  List<Memo> memoList = [
    Memo(content: "장보기 목록: 사과, 양파"),
    Memo(content: "오늘의 할일: 코딩 공부"),
  ];
}
