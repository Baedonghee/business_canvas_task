import { Button, Layout, theme } from 'antd';
import styled from 'styled-components';

import Typography from 'components/Typography';

const { Header, Content } = Layout;

const HeaderWrapper = styled(Header)<{ bgColor: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 14px;
  background-color: ${({ bgColor }) => bgColor};
  height: 48px;
`;

const data = [
  {
    name: '이름',
    address: '주소',
    memo: '메모',
    joinDate: '2025-01-01',
    job: '개발자',
    isEmail: true,
  },
];

const { useToken } = theme;

const Main = () => {
  const {
    token: { colorBgContainer },
  } = useToken();
  return (
    <>
      <HeaderWrapper bgColor={colorBgContainer}>
        <Typography>qwe</Typography>
        <Button>추가</Button>
      </HeaderWrapper>
    </>
  );
};

export default Main;
