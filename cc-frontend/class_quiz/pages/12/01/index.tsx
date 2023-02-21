import React from "react";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";

export default function Page() {
  const handleComplete = (address: Address) => {
    console.log(address);
  };

  return (
    <>
      <DaumPostcodeEmbed
        onComplete={handleComplete}
        autoClose={true}
        errorMessage={"현재 Daum 우편번호 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요."}
        style={{ width: "100%", height: "500px" }}
      />
    </>
  );
}
