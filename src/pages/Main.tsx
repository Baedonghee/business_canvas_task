import { Button, Layout, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';

import CheckBox from 'components/Checkbox';
import More from 'components/SVG/icons/more';
import Plus from 'components/SVG/icons/plus';
import Table from 'components/Table';
import Typography from 'components/Typography';

const { Header } = Layout;
const { useToken } = theme;

const HeaderWrapper = styled(Header)<{ bgColor: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 14px;
  background-color: ${({ bgColor }) => bgColor};
  height: 48px;
`;

interface DataType {
  key: string;
  name: string;
  memo: string;
  joinDate: string;
  job: string;
  isEmail: React.ReactNode;
  more: React.ReactNode;
}

const columns: ColumnsType<DataType> = [
  { title: '이름', dataIndex: 'name' },
  { title: '메모', dataIndex: 'memo' },
  { title: '가입일', dataIndex: 'joinDate' },
  { title: '직업', dataIndex: 'job' },
  { title: '이메일 수신 동의', dataIndex: 'isEmail' },
  { title: '', dataIndex: 'more', width: 48, align: 'center' },
];

const data: DataType[] = [
  {
    key: '1',
    name: '홍길동',
    memo: '홍길동 메모',
    joinDate: '2021-01-01',
    job: '개발자',
    isEmail: <CheckBox name="isEmail1" checked={true} readOnly />,
    more: <Button type="text" icon={<More width="16" height="16" />}></Button>,
  },
  {
    key: '2',
    name: '이순신',
    memo: '이순신 메모',
    joinDate: '2021-01-01',
    job: '개발자',
    isEmail: <CheckBox name="isEmail2" checked={false} />,
    more: <Button type="text" icon={<More width="16" height="16" />}></Button>,
  },
];

const Main = () => {
  const {
    token: { colorBgContainer },
  } = useToken();

  return (
    <>
      <HeaderWrapper bgColor={colorBgContainer}>
        <Typography>qwe</Typography>
        <Button type="primary" icon={<Plus width="16" height="16" />} style={{ padding: '0px 14px' }}>
          추가
        </Button>
      </HeaderWrapper>
      <Table<DataType> data={data} columns={columns} showCheckbox={true} />
    </>
  );
};

export default Main;
