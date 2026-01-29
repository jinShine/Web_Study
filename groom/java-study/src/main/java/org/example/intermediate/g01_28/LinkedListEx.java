package org.example.intermediate.g01_28;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class LinkedListEx {
  public static void main(String[] agrs) {

    // 기본 생성
    LinkedList<String> list = new LinkedList<>();

    list.add("apple ");
    list.add("banana");
    list.add("cherry");

    list.addFirst("pineapple");
    list.addLast("orange");
    System.out.println(list);

    // 조회
    String first = list.getFirst();
    String last = list.getLast();

    list.removeFirst();
    list.removeLast();

  }
}
