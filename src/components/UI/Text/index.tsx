import { color, ColorProps, flexbox, FlexboxProps, layout, LayoutProps, space, SpaceProps, typography, TypographyProps } from '@techstack/styled-system';
import { Typography as AntdTypography } from 'antd';
import { TextProps } from 'antd/es/typography/Text';
import styled from 'styled-components';

type ITypographyProps = SpaceProps & LayoutProps & ColorProps & FlexboxProps & TypographyProps & TextProps;

const { Text: AntdText } = AntdTypography;

const Text = styled(AntdText).withConfig({
  shouldForwardProp: (prop) => !['m', 'p', 'color', 'bg', 'display', 'fontSize', 'fontWeight', 'textAlign'].includes(prop),
})<ITypographyProps>`
  && {
    ${space}
    ${color}
    ${flexbox}
    ${layout}
    ${typography}
  }
`;

export default Text;
