import isPropValid from '@emotion/is-prop-valid';
import { ConfigProvider, Layout, theme } from 'antd';
import koKR from 'antd/locale/ko_KR';
import Main from 'pages/Main';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/GlobalStyle';

const { useToken } = theme;

function App() {
  const { token } = useToken();

  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <ConfigProvider
        locale={koKR}
        theme={{
          token: {
            fontFamily: 'Pretendard, sans-serif',
            borderRadius: 8,
          },
        }}
      >
        <ThemeProvider
          theme={{
            token,
          }}
        >
          <GlobalStyle />
          <Layout>
            <Main />
          </Layout>
        </ThemeProvider>
      </ConfigProvider>
    </StyleSheetManager>
  );
}

export default App;
