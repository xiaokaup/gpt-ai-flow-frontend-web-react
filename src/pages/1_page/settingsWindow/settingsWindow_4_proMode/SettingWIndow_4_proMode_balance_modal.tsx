import React from 'react';
import { Modal } from 'antd';

interface ISettingWIndow_4_proMode_balance_modal_input {
  isModalOpen: boolean;
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SettingWIndow_4_proMode_balance_modal = (props: ISettingWIndow_4_proMode_balance_modal_input) => {
  const { isModalOpen, setIsModelOpen } = props;

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <Modal
      title="Balance Modal"
      open={isModalOpen}
      // onOk={handleOk}
      onCancel={() => {
        setIsModelOpen(false);
      }}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};
