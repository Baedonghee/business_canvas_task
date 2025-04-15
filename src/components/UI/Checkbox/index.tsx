import React from 'react';
import { layout, LayoutProps, space, SpaceProps } from '@techstack/styled-system';
import { theme } from 'antd';
import classNames from 'classnames';
import styled from 'styled-components';

import CheckboxSquareDisabled from '../SVG/icons/checkbox-square-disabled';
import CheckboxSquareOff from '../SVG/icons/checkbox-square-off';
import CheckboxSquareOn from '../SVG/icons/checkbox-square-on';

interface ICheckbox extends LayoutProps, SpaceProps {
  name: string;
  children?: React.ReactNode;
  checked?: boolean;
  readOnly?: boolean;
  className?: string;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  width?: string;
  height?: string;
  fontSize?: string;
}

interface IStyle extends LayoutProps, SpaceProps {
  isLabel: boolean;
  fontSize: string;
}

const CheckboxWrapper = styled.div<IStyle>`
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

const Checkbox: React.FC<ICheckbox> = ({
  name,
  checked = false,
  children,
  readOnly = false,
  className,
  onChange,
  disabled = false,
  width = '16',
  height = '16',
  fontSize = '14px',
  ...props
}) => {
  const { token } = useToken();
  const onCheckClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled || readOnly) {
      e.stopPropagation();
      return;
    }
    const newChecked = !checked;
    onChange?.(newChecked);
  };
  return (
    <CheckboxWrapper
      onClick={onCheckClick}
      className={classNames(className, {
        disabled: disabled,
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
    </CheckboxWrapper>
  );
};

export default Checkbox;
