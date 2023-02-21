import React, { useState } from "react";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";
import { Address } from "cluster";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressValue, setAddressValue] = useState("");

  // Modal
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const showModal = () => {
    toggleModal();
    console.log("showModal");
  };

  const handleOk = () => {
    toggleModal();
    console.log("handleOk");
  };

  const handleCancel = () => {
    toggleModal();
    console.log("handleCancel");
  };

  // Daum Post
  const handleComplete = (address: Address) => {
    console.log(address);

    setAddressValue(address.address);
    toggleModal();
  };

  return (
    <>
      <button onClick={showModal}>모달 열기</button>
      <p>{addressValue}</p>

      {isModalOpen && (
        <Modal title="게시글 등록" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <DaumPostcodeEmbed
            onComplete={handleComplete}
            autoClose={true}
            errorMessage={
              "현재 Daum 우편번호 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요."
            }
          />
        </Modal>
      )}
    </>
  );
};

export default App;
