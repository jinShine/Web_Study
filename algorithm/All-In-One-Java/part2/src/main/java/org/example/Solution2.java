package org.example;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * 문제 2
 * 올바른 소괄호쌍
 * 
 * 주어진 문자열 s는 ‘(’와’)’로만 이루어져 있습니다. 이때 문자열 s에서 올바른 소괄호 쌍의 개수를 반환하는 solution 함수를
 * 작성하세요.
 * 
 * 만약 문자열 s가 올바른 소괄호가 아니면 -1을 반환합니다.
 * 
 * 올바른 소괄호 ‘(’로 열렸으면 반드시 짝지어서 ‘)’로 닫혀야 합니다.
 * 
 * 제약 조건
 * - 1 <= s.length <= 10^5
 * - s는 ‘(’와’)’로만 이루어져 있습니다.
 * 
 * 예시
 * s = "(()())()"
 * 결과: 4
 * 
 * s = "((())()"
 * 결과: -1
 * 
 * s = "())()"
 * 결과: -1
 */
public class Solution2 {

    public int solve(String s) {
        int answer = 0;
        Deque<Character> stack = new ArrayDeque<>();

        for (char c : s.toCharArray()) {
            if (c == '(') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) {
                    return -1;
                }

                stack.pop();
                answer++;
            }
        }

        return stack.isEmpty() ? answer : -1;
    }
}
