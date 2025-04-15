import { ConfigProvider } from 'antd';
import koKR from 'antd/locale/ko_KR';
import GlobalStyle from 'styles/GlobalStyle';

function App() {
  return (
    <ConfigProvider locale={koKR}>
      <GlobalStyle />
    </ConfigProvider>
  );
}

export default App;
