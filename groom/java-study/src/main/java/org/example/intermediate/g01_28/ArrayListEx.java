package org.example.intermediate.g01_28;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class ArrayListEx {
  public static void main(String[] agrs) {

    // 기본 생성
    List<String> list = new ArrayList<>();
    list.add("apple");
    list.add("banana");
    list.add("cherry");

    list.addAll(Arrays.asList("peach", "orange", "pineapple"));
    System.out.println(list);

    // 조회
    list.get(0);

    // 갯수
    list.size();

    // 삭제
    list.remove(0);

    // 비어있는지 확인
    boolean empty = list.isEmpty();

    // 포함 여부
    boolean hasApple = list.contains("apple");

    // indexOf - 없으면 -1 반환
    int index = list.indexOf("banana");

    // 수정
    list.set(list.size() - 1, "grape");

    ArrayList<Integer> newList = new ArrayList<>(Arrays.asList(7, 4, 5, 6, 2, 3, 9));
    Collections.sort(newList);
    System.out.println(newList);

    Collections.reverse(newList);
    System.out.println(newList);

  }
}
