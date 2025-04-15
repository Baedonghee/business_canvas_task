import React from 'react';
import { Modal as AntdModal, ModalProps as AntdModalProps } from 'antd';
import styled from 'styled-components';

import Text from 'components/UI/Text';

const ModalWrapper = styled(AntdModal).withConfig({
  shouldForwardProp: (prop) => prop !== 'theme',
})`
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
      color: ${({ theme }) => theme?.token.colorPrimary};
      padding: ${({ theme }) => theme.token.paddingSM}px ${({ theme }) => theme?.token.padding}px;
      margin-top: 0px;
      background-color: ${({ theme }) => theme?.token.colorFillAlter};
      border-top: 1px solid ${({ theme }) => theme?.token.colorSplit};
    }
  }
`;

interface IModal extends AntdModalProps {
  isModalOpen: boolean;
  children: React.ReactNode;
  title: string;
  footer: React.ReactNode;
}

const Modal = ({ isModalOpen, children, title, footer, ...props }: IModal) => {
  return (
    <ModalWrapper title={<Text fontSize="14px">{title}</Text>} open={isModalOpen} footer={footer} {...props}>
      {children}
    </ModalWrapper>
  );
};

export default Modal;
