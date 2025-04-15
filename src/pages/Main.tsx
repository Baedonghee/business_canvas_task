import { Button, Layout, theme } from 'antd';
import styled from 'styled-components';

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
  age: number;
  address: string;
}

const columns = [
  { title: 'Name', dataIndex: 'name', render: (text: string) => <a>{text}</a> },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' },
];

const data: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', age: 32, address: 'Sydney No. 1 Lake Park' },
  { key: '4', name: 'Disabled User', age: 99, address: 'Sydney No. 1 Lake Park' },
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
      <Table<DataType>
        data={data}
        columns={columns}
        showCheckbox // Checkbox 표시 여부를 prop으로 전달
      />
    </>
  );
};

export default Main;
