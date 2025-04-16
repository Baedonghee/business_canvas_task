import { color, ColorProps, flexbox, FlexboxProps, layout, LayoutProps, space, SpaceProps, typography, TypographyProps } from '@techstack/styled-system';
import { Typography as AntdTypography } from 'antd';
import type { TitleProps } from 'antd/es/typography/Title';
import styled from 'styled-components';

type ITypographyProps = SpaceProps & LayoutProps & ColorProps & FlexboxProps & TypographyProps & TitleProps;

const { Title: AntdTitle } = AntdTypography;

/**
 * 타이틀
 * @param props 속성
 * @returns
 */
const Title = styled(AntdTitle).withConfig({
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

export default Title;
