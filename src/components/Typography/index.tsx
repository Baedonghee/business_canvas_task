import { color, ColorProps, flexbox, FlexboxProps, LayoutProps, space, SpaceProps, typography, TypographyProps } from '@techstack/styled-system';
import { Typography as AntdTypography } from 'antd';
import styled from 'styled-components';

type ITypographyProps = SpaceProps & LayoutProps & ColorProps & FlexboxProps & TypographyProps;

const Typography = styled(AntdTypography)<ITypographyProps>`
  ${space}
  ${color}
  ${flexbox}
  ${typography}
`;

export default Typography;
