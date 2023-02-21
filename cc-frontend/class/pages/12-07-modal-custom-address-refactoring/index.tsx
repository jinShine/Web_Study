import React, { useState } from "react";
import { Button, Modal } from "antd";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleComplete = (address: Address) => {
    console.log("# address", address);
    console.log("# onComplete");
    onToggleModal();
  };

  return (
    <>
      <Button type="primary" onClick={onToggleModal}>
        모달창 열기
      </Button>

      {/* 모달 종료 방식 - 1. 모달 숨기는 방법 ex) 이력서 등 */}
      {/* <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DaumPostcodeEmbed onComplete={handleComplete} />
      </Modal> */}

      {/* 모달 종료 방식 - 2. 모달 삭제하는 방법 ex) 신용카드, 비밀번호 등 */}
      {isModalOpen && (
        <Modal
          title="Basic Modal"
          open={true}
          onOk={onToggleModal}
          onCancel={onToggleModal}
        >
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
    </>
  );
};

export default App;
