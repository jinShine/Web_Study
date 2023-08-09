import Script from "next/script";

declare const window: typeof globalThis & {
  IMP: any;
};

export default function PaymentPage() {
  const onClickPayment = () => {
    const IMP = window.IMP; // 생략 가능
    IMP.init("imp50387830"); // 예: imp00000000

    IMP.request_pay(
      {
        // param
        pg: "tosspay", // "nice, tosspay",
        pay_method: "card", // card, vbank(무통장입금) 등

        // merchant_uid
        // - 가맹점에서 지정하는 자체 주문번호
        // - 결제완료(paid / 빌링키발급 포함)된 거래에 사용된 적있는 merchant_uid는 재사용이 불가
        // - 중복될 시 결제 안됨!
        // - 입력 안하면 자동으로 상품번호가 생긴다.
        // merchant_uid: "ORD20180131-00000113",
        name: "노르웨이 회전 의자",
        amount: 100,
        buyer_email: "gildong@gmail.com",
        buyer_name: "홍길동",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
        m_redirect_url: "http://localhost:3000/28-01-payment", // 모바일에서는 결제시, 결제페이지로 사이트가 이동됨
      },
      (rsp) => {
        // callback
        if (rsp.success) {
          // 1. 결제 성공 시 로직,
          // {
          //   "success": true,
          //   "imp_uid": "imp_046926950608",
          //   "pay_method": "trans",
          //   "merchant_uid": "ORD20180131-00000112",
          //   "name": "노르웨이 회전 의자",
          //   "paid_amount": 100,
          //   "currency": "KRW",
          //   "pg_provider": "tosspay",
          //   "pg_type": "payment",
          //   "pg_tid": "feae850c-dcec-4e77-a115-5509e193b7e8",
          //   "apply_num": "",
          //   "buyer_name": "홍길동",
          //   "buyer_email": "gildong@gmail.com",
          //   "buyer_tel": "010-4242-4242",
          //   "buyer_addr": "서울특별시 강남구 신사동",
          //   "buyer_postcode": "01181",
          //   "custom_data": null,
          //   "status": "paid",
          //   "paid_at": 1679030986,
          //   "receipt_url": "",
          //   "card_name": "",
          //   "bank_name": "",
          //   "card_quota": 0,
          //   "card_number": ""
          // }
          console.log(rsp);

          // 2. 백엔드에 결제 관련 데이터 넘겨주기
          // createPointTransactionOfLoading

          // 프론트엔드에서 시간을 만드는 것은 안됨!
          // const paymentDate = new Date()
          //
        } else {
          // 결제 실패 시 로직,
          alert("결제에 실패했습니다! 다시 시도해 주세요!");
        }
      }
    );
  };

  return (
    <>
      <Script src="https://cdn.iamport.kr/v1/iamport.js"></Script>
      <button onClick={onClickPayment}>결제하기</button>
    </>
  );
}
