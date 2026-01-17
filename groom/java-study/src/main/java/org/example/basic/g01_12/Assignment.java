package org.example.basic.g01_12;

/// //////////////////////////////////////
// 상품 정보를 저장하고 출력하는 프로그램을 작성하세요.

public class Assignment {
	public static void main(String[] args) {
		final double TAX_RATE = 0.1;

		// 상품 정보
		String productName = "노트북";
		int price = 1500000;
		int quantity = 2;
		boolean isAvailable = true;
		char category = 'E';

		// 계산
		int totalPrice = price * quantity;
		double tax = totalPrice * TAX_RATE;
		double finalPrice = totalPrice + tax;

		System.out.println("======= 상품 =======");
		System.out.println("상품명: " + productName);
		System.out.println("단가: " + price + "원");
		System.out.println("수량: " + quantity + "개");
		System.out.println("카테고리: " + category);
		System.out.println("재고 여부: " + isAvailable);

		System.out.println("====== 결제 정보 ====== ");
		System.out.println("상품 금액: " + totalPrice + "원");
		System.out.println("세금 (10%): " + (int) tax + "원");
		System.out.println("최종 금액: " + (int) finalPrice + "원");
	}
}
