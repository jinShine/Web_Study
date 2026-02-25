package org.example;

import java.util.Arrays;

/**
 * 문제 1
 * 무료 행사
 * 
 * 당신은 슈퍼마켓에서 진행 중인 할인 이벤트에 참여하고 있습니다.
 * 이 이벤트는 두개 의 상품을 선택해 그 가격의 합이 목표금액(정수 target)과 일치하면 무료로 상품을 받을 수 있는 이벤트 입니다.
 * 매장에는 여러 상품이 있으며, 각 상품의 가격은 정수 배열 prices로 주어집니다.
 * 두 가지 상품을 선택해서 목표 금액을 맞출 수 있는 경우의 수는 몇개인지 반환하는 solution함수를 작성해 주세요
 * 단, 같은 상품을 한번에 중복으로 선택할 수는 없으며, 같은 가격을 가진 상품은 없습니다.
 * 
 * 제약 조건
 * - 2 <= prices.length <= 10^5
 * - 1 <= prices[i] <= 10^9
 * - 2 <= target <= 10^9
 * 
 * 예시
 * prices = [4, 1, 9, 7, 5, 3, 16], target = 14
 * 결과: 1
 * 
 * prices = [2, 1, 5, 7], target = 4
 * 결과: 0
 */
public class Solution1 {

    public int solve완전탐색(int[] prices, int target) {
        int answer = 0;
        int length = prices.length;

        for (int i = 0; i < length; i++) {
            for (int j = i + 1; j < length; j++) {
                if (prices[i] + prices[j] == target) {
                    answer++;
                }
            }
        }

        return answer;
    }

    public int solve투포인터(int[] prices, int target) {
        int answer = 0;
        Arrays.sort(prices);

        int left = 0;
        int right = prices.length - 1;

        while (left < right) {
            if (prices[left] + prices[right] < target) {
                left++;
            } else if (prices[left] + prices[right] > target) {
                right--;
            } else {
                answer++;
                left++;
                right--;
            }
        }

        return answer;
    }
}
