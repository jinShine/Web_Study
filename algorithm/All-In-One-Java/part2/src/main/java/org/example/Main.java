package org.example;

import java.util.Arrays;

public class Main {
	public static void main(String[] args) {
		System.out.println("====== 무료행사 ======");
		Solution1 s1 = new Solution1();
		int[] ex1Prices = { 4, 1, 9, 7, 5, 3, 16 };
		int ex1Target = 14;
		int result1 = s1.solve완전탐색(ex1Prices, ex1Target);
		int result2 = s1.solve투포인터(ex1Prices, ex1Target);
		System.out.println("완전탐색 결과 ex1: " + result1);
		System.out.println("투포인터 결과 ex1: " + result2);

		int[] ex2Prices = { 2, 1, 5, 7 };
		int ex2Target = 4;
		int result3 = s1.solve완전탐색(ex2Prices, ex2Target);
		int result4 = s1.solve투포인터(ex2Prices, ex2Target);
		System.out.println("완전탐색 결과 ex2: " + result3);
		System.out.println("투포인터 결과 ex2: " + result4);

		System.out.println("====== 올바른 소괄호쌍 ======");
		Solution2 s2 = new Solution2();
		String ex1S = "(()())()";
		int result5 = s2.solve(ex1S);
		System.out.println("결과 ex1: " + result5);

		String ex2S = "((())()";
		int result6 = s2.solve(ex2S);
		System.out.println("결과 ex2: " + result6);

		String ex3S = "())()";
		int result7 = s2.solve(ex3S);
		System.out.println("결과 ex3: " + result7);

		System.out.println("====== 올바른 괄호쌍 ======");
		Solution3 s3 = new Solution3();
		String ex1S3 = "()[]{}";
		int result8 = s3.solve(ex1S3);
		System.out.println("결과 ex1: " + result8);

		String ex2S3 = "{(([]))[]}";
		int result9 = s3.solve(ex2S3);
		System.out.println("결과 ex2: " + result9);

		String ex3S3 = "([)]";
		int result10 = s3.solve(ex3S3);
		System.out.println("결과 ex3: " + result10);

		System.out.println("====== 점진적 과부하 ======");
		Solution4 s4 = new Solution4();
		int[] ex1Weights = { 25, 23, 31, 28, 25, 25, 27, 29 };
		int[] result11 = s4.solve(ex1Weights);
		System.out.println("결과 ex1: " + Arrays.toString(result11));

		int[] ex2Weights = { 45, 42, 50, 48, 46, 52, 49 };
		int[] result12 = s4.solve(ex2Weights);
		System.out.println("결과 ex2: " + Arrays.toString(result12));

		int[] ex3Weights = { 79, 76, 73, 65, 65, 59 };
		int[] result13 = s4.solve(ex3Weights);
		System.out.println("결과 ex3: " + Arrays.toString(result13));
	}
}