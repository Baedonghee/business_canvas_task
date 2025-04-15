import isPropValid from '@emotion/is-prop-valid';
import { ConfigProvider, Layout } from 'antd';
import koKR from 'antd/locale/ko_KR';
import Main from 'pages/Main';
import { StyleSheetManager } from 'styled-components';
import GlobalStyle from 'styles/GlobalStyle';

function App() {
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
        <GlobalStyle />
        <Layout>
          <Main />
        </Layout>
      </ConfigProvider>
    </StyleSheetManager>
  );
}

export default App;
