import React from 'react';
import { Modal as AntdModal } from 'antd';
import styled from 'styled-components';

import Text from 'components/UI/Text';

const StyledModal = styled(AntdModal)`
  && {
    .ant-modal-content {
      padding: 0;
      .ant-modal-close {
        top: 8px;
      }
    }
    .ant-modal-body {
      padding: 10px ${({ theme }) => theme.token.paddingContentHorizontalLG}px 0px;
    }

    .ant-modal-header {
      border-bottom: 1px solid ${({ theme }) => theme?.token.colorBorderSecondary};
      padding: ${({ theme }) => theme.token.paddingSM}px ${({ theme }) => theme?.token.padding}px;
      margin-bottom: 0px;
    }

    .ant-modal-footer {
      color: ${({ theme }) => theme?.token?.colorPrimary || '#1890ff'};
    }
  }
`;

const Modal = ({ isModalOpen, children }: { isModalOpen: boolean; children: React.ReactNode }) => {
  return (
    <StyledModal
      title={<Text fontSize="14px">회원 추가</Text>}
      open={isModalOpen}
      onOk={() => console.log('ok')}
      onCancel={() => console.log('cancel')}
      footer="Footer"
    >
      {children}
    </StyledModal>
  );
};

export default Modal;
