import React, { useState } from "react";
import { Modal, Button } from "antd";

const ActionModal = ({ title, content, onOk, onCancel,visible=false }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
    if (onOk) {
      onOk();
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div>
      <Modal
        title={title}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {content}
      </Modal>
    </div>
  );
};

export default ActionModal;