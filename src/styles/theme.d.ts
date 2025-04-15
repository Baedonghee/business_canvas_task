import { ThemeConfig } from 'antd';

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    token: NonNullable<ThemeConfig['token']>;
  }
}
