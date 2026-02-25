package org.example;

/**
 * 문제 4
 * 점진적 과부하
 * 
 * 스쿼트에 진심인 피트니스 매니아가 매일 최대 중량 기록을 측정하고 있습니다. 그의 목표는 더 무거운 무게를 드는 날을 지속적으로 만들어가는
 * 것입니다.
 * 
 * 매일의 스쿼트 최대 중량 기록이 정수 배열 weights로 주어졌을 때, 각 날의 중량보다 더 높은 중량을 든 날까지 걸린 일수를 계산하여
 * 배열로 반환하는 solution함수를 작성하세요
 * 
 * 만약 이후에 더 높은 중량을 들지 못했다면 해당 값은 0으로 설정합니다.
 * 
 * 제약 조건
 * - 1 ≤ weights.length ≤ 10^5
 * - 1 ≤ weights[i] ≤ 10^3
 * 
 * 예시
 * input : weights = [25, 23, 31, 28, 25, 25, 27, 29]
 * output : [2, 1, 0, 4, 2, 1, 1, 0]
 * 
 * input : weights = [45, 42, 50, 48, 46, 52, 49]
 * output : [2, 1, 3, 2, 1, 0, 0]
 * 
 * input : weights = [79, 76, 73, 65, 65, 59]
 * output : [0, 0, 0, 0, 0, 0]
 */
public class Solution4 {

    public int[] solve(int[] weights) {
        int n = weights.length;
        int[] answer = new int[n];
        int count = 0;

        for (int i = 0; i < n; i++) {
            int w = weights[i];

            for (int j = i + 1; j < n; j++) {
                count++;

                if (w < weights[j]) {
                    answer[i] = count;
                    count = 0;
                    break;
                } else {
                    answer[i] = 0;

                    if (j == n - 1) {
                        count = 0;
                    }
                }
            }
        }

        return answer;
    }
}
