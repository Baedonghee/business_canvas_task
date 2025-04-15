import { Layout } from 'antd';
import styled from 'styled-components';

import CheckBox from 'components/Checkbox';
import Typography from 'components/Typography';

const { Header, Content } = Layout;

const HeaderWrapper = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  background-color: #fff;
  height: auto;
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

const Main = () => {
  return (
    <>
      <HeaderWrapper>
        <Typography>qwe</Typography>
        <CheckBox checked disabled>
          qweaa
        </CheckBox>
      </HeaderWrapper>
    </>
  );
};

export default Main;
