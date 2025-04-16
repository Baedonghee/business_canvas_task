import { color, ColorProps, flexbox, FlexboxProps, layout, LayoutProps, space, SpaceProps } from '@techstack/styled-system';
import type { FlexProps } from 'antd';
import { Flex as AntdFlex } from 'antd';
import styled from 'styled-components';

type IFlexProps = SpaceProps & LayoutProps & ColorProps & FlexboxProps & FlexProps;
/**
 * 플렉스
 * @param props 속성
 * @returns
 */
const Flex = styled(AntdFlex).withConfig({
  shouldForwardProp: (prop) => !['m', 'p', 'color', 'bg', 'display', 'width', 'height', 'flexDirection', 'alignItems', 'justifyContent'].includes(prop),
})<IFlexProps>`
  && {
    ${space}
    ${color}
    ${flexbox}
    ${layout}
  }
`;

export default Flex;
