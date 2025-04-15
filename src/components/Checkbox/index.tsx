import React from 'react';
import { layout, LayoutProps, space, SpaceProps } from '@techstack/styled-system';
import { theme } from 'antd';
import classNames from 'classnames';
import styled from 'styled-components';

import CheckboxSquareDisabled from '../SVG/icons/checkbox-square-disabled';
import CheckboxSquareOff from '../SVG/icons/checkbox-square-off';
import CheckboxSquareOn from '../SVG/icons/checkbox-square-on';

interface ICheckBox extends LayoutProps, SpaceProps {
  name: string;
  children?: React.ReactNode;
  checked?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  disabled?: boolean;
  width?: string;
  height?: string;
  fontSize?: string;
}

interface IStyle extends LayoutProps, SpaceProps {
  isLabel: boolean;
  fontSize: string;
}

const CheckBoxWrapper = styled.div<IStyle>`
  ${layout}
  ${space}
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    margin-right: ${({ isLabel }) => (isLabel ? '8px' : '0px')};
  }
  label {
    font-size: ${({ fontSize }) => fontSize};
    cursor: pointer;
  }
  &.disabled {
    cursor: not-allowed;
  }
`;

const { useToken } = theme;

const CheckBox: React.FC<ICheckBox> = ({
  name,
  checked = false,
  children,
  className,
  onClick,
  disabled = false,
  width = '16',
  height = '16',
  fontSize = '14px',
  ...props
}) => {
  const { token } = useToken();
  const onCheckClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) {
      e.stopPropagation();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <CheckBoxWrapper
      onClick={onCheckClick}
      className={classNames(className, {
        disabled,
      })}
      isLabel={!!children}
      fontSize={fontSize}
      {...props}
    >
      {disabled ? (
        <CheckboxSquareDisabled width={width} height={height} />
      ) : checked ? (
        <CheckboxSquareOn width={width} height={height} color={token.colorPrimary} />
      ) : (
        <CheckboxSquareOff width={width} height={height} />
      )}
      {children && <label htmlFor={name}>{children}</label>}
    </CheckBoxWrapper>
  );
};

export default CheckBox;
