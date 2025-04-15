import { color, ColorProps, flexbox, FlexboxProps, layout, LayoutProps, space, SpaceProps, typography, TypographyProps } from '@techstack/styled-system';
import { Button as AntdButton } from 'antd';
import { ButtonProps } from 'antd/es/button';
import styled from 'styled-components';

type IButtonProps = ButtonProps & SpaceProps & LayoutProps & ColorProps & TypographyProps & FlexboxProps;

const Button = styled(AntdButton).withConfig({
  shouldForwardProp: (prop) => !['m', 'p', 'color', 'bg', 'display', 'fontSize', 'fontWeight', 'textAlign'].includes(prop),
})<IButtonProps>`
  && {
    ${space}
    ${color}
    ${flexbox}
    ${layout}
    ${typography}
  }
`;

export default Button;
