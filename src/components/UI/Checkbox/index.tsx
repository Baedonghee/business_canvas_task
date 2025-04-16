import React from 'react';
import { layout, LayoutProps, space, SpaceProps } from '@techstack/styled-system';
import { theme } from 'antd';
import classNames from 'classnames';
import styled, { css } from 'styled-components';

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
  isFilter?: boolean;
}

interface IStyle extends LayoutProps, SpaceProps {
  isLabel: boolean;
  fontSize: string;
  checked: boolean;
  isFilter: boolean;
}

const CheckboxWrapper = styled.div<IStyle>`
  ${layout}
  ${space}
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: ${({ theme }) => `${theme.token.borderRadiusSM}px`};
  svg {
    margin-right: ${({ isLabel }) => (isLabel ? '8px' : '0px')};
  }
  label {
    font-size: ${({ fontSize }) => fontSize};
    cursor: pointer;
  }
  ${({ isFilter }) =>
    isFilter &&
    css`
      transition: background-color 0.2s ease;
      &:hover {
        background-color: theme.token.controlItemBgHover;
      }
      &:active {
        background-color: theme.token.controlItemBgActive;
      }
      &:focus {
        background-color: theme.token.controlItemBgActive;
      }
    `}
  &.disabled {
    cursor: not-allowed;
  }
  ${({ checked, theme, isFilter }) =>
    checked &&
    isFilter &&
    css`
      background-color: ${theme.token.controlItemBgActive};
    `}
`;

const { useToken } = theme;
/**
 * 체크박스
 * @param name 이름
 * @param checked 체크 여부
 * @param children 자식 요소
 * @param readOnly 읽기 전용 여부
 * @param className 클래스 이름
 * @param onChange 변경 이벤트
 * @param disabled 비활성화 여부
 * @param width 너비
 * @param height 높이
 * @param fontSize 폰트 크기
 * @param isFilter 필터 여부
 * @param props 속성
 */
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
  isFilter = false,
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
      checked={checked}
      isFilter={isFilter}
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
