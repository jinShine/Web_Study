import { Button, MenuProps, Space } from "antd";
import { Dropdown } from "antd";
import { useRouter } from "next/router";
import Script from "next/script";

declare const window: typeof globalThis & {
  IMP: any;
};

export default function Page() {
  const router = useRouter();

  const items: MenuProps["items"] = [
    {
      key: "500",
      label: "500원",
    },
    {
      key: "1000",
      label: "1000원",
    },
    {
      key: "2000",
      label: "2000원",
    },
    {
      key: "5000",
      label: "5000원",
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const price = Number(e.key);

    const IMP = window.IMP; // 생략 가능
    IMP.init("imp50387830"); // 예: imp00000000

    IMP.request_pay(
      {
        // param
        pg: "tosspay", // "nice, tosspay",
        pay_method: "card", // card, vbank(무통장입금) 등
        name: "노르웨이 회전 의자",
        amount: price,
        buyer_email: "gildong@gmail.com",
        buyer_name: "홍길동",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
      },
      (rsp) => {
        // callback
        if (rsp.success) {
          console.log(rsp);
          router.push("/28/payment/complete");
        } else {
          alert("결제에 실패했습니다! 다시 시도해 주세요!");
        }
      }
    );
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <Script src="https://cdn.iamport.kr/v1/iamport.js"></Script>
      <Dropdown menu={menuProps}>
        <Button>
          <Space>충전 금액</Space>
        </Button>
      </Dropdown>
    </>
  );
}
