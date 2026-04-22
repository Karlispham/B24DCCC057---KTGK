import React from 'react';
import { Modal, Button } from 'antd';

interface DeleteConfirmModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      title="Xác nhận xóa"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="confirm" type="primary" onClick={onConfirm}>
          Xác nhận
        </Button>,
      ]}
    >
      <p>Có chắc chắn muốn xóa nhân viên này không?</p>
    </Modal>
  );
};

export default DeleteConfirmModal;