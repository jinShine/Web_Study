import React, { useState } from "react";
import { Modal } from "antd";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <button onClick={showModal}>모달 열기</button>
      <Modal title="게시글 등록" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>게시글이 등록되었습니다.</p>
      </Modal>
    </>
  );
};

export default App;
