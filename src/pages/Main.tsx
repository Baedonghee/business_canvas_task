import { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import initialData from 'common/db.json';
import styled from 'styled-components';

import DropdownAndMoreButton from 'components/DropdownAndMoreButton';
import Button from 'components/UI/Button';
import CheckBox from 'components/UI/Checkbox';
import Plus from 'components/UI/SVG/icons/plus';
import Table from 'components/UI/Table';
import Typography from 'components/UI/Typography';

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

const Main = () => {
  const {
    token: { colorBgContainer },
  } = useToken();

  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const { data } = initialData;
    const newData = data.map((item, index) => ({
      key: (index + 1).toString(),
      name: item.name,
      memo: item.memo,
      joinDate: item.joinDate,
      job: item.job,
      isEmail: <CheckBox name="isEmail1" checked={item.isEmail} readOnly />,
      more: <DropdownAndMoreButton />,
    }));

    setData(newData);
  }, []);

  return (
    <>
      <HeaderWrapper bgColor={colorBgContainer}>
        <Typography level={5} mb="0px">
          회원 목록
        </Typography>
        <Button type="primary" icon={<Plus width="16" height="16" />} p="0px 14px">
          추가
        </Button>
      </HeaderWrapper>
      <Table<DataType> data={data} columns={columns} showCheckbox={true} />
    </>
  );
};

export default Main;
