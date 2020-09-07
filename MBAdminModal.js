import React, { useState } from 'react';
import { MBModal } from 'h5ds-mbui';
import './mb-admin-modal.less';

function MBAdminModal({ title, footer, visible, onCancel, onSubmit }) {
  const [obj, setObj] = useState({
    account: '',
    password: '',
  });
  const handleAccount = (e) => {
    obj.account = e.target.value;
    setObj({ ...obj });
  };
  const handlePsw = (e) => {
    obj.password = e.target.value;
    setObj({ ...obj });
  };
  return (
    <>
      <MBModal className="uimb-admin-modal" title={title} footer={footer} visible={visible} onCancel={onCancel}>
        <div className="uimb-admin-modal-input-text">
          <span>账号</span>
          <input onChange={handleAccount} type="text" />
        </div>
        <div className="uimb-admin-modal-input-psw">
          <span>密码</span>
          <input onChange={handlePsw} type="password" />
        </div>
        <button
          className="uimb-admin-modal-btn"
          onClick={() => {
            onSubmit(obj);
          }}
        >
          确定
        </button>
      </MBModal>
    </>
  );
}

export default MBAdminModal;
