import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:hh_03_1_memo/main.dart';

class Memo {
  Memo({required this.content});

  String content;

  Map toJson() => {"content": content};

  factory Memo.fromJson(json) => Memo(content: json["content"]);
}

class MemoService extends ChangeNotifier {
  MemoService() {
    loadMemoList();
  }

  List<Memo> memoList = [
    Memo(content: "장보기 목록: 사과, 양파"),
    Memo(content: "오늘의 할일: 코딩 공부"),
  ];

  createMemo({required String content}) {
    Memo memo = Memo(content: content);
    memoList.add(memo);

    // Consumer<MemoService>의 builder 부분을 호출해서 화면 새로고침
    notifyListeners();
    saveMemoList();
  }

  updateMemo({required int index, required String content}) {
    Memo memo = memoList[index];
    memo.content = content;

    notifyListeners();
    saveMemoList();
  }

  deleteMemo({required int index}) {
    memoList.removeAt(index);

    notifyListeners();
    saveMemoList();
  }

  // 메모 데이터 저장
  saveMemoList() {
    List memoJsonList = memoList.map((memo) => memo.toJson()).toList();
    prefs.setString("memoList", jsonEncode(memoJsonList));
  }

  // 메모 데이터 불러오기
  loadMemoList() {
    List memoJsonList = jsonDecode(prefs.getString("memoList") ?? "[]");
    memoList = memoJsonList.map((memo) => Memo.fromJson(memo)).toList();
  }
}
