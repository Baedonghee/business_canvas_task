import { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import db from 'common/db.json';
import styled from 'styled-components';
import { IUser } from 'types/user';
import { createStorage } from 'utils/storage';

import DropdownAndMoreButton from 'components/DropdownAndMoreButton';
import MemberModal from 'components/MemberModal';
import Button from 'components/UI/Button';
import Checkbox from 'components/UI/Checkbox';
import Plus from 'components/UI/SVG/icons/plus';
import Table from 'components/UI/Table';
import Typography from 'components/UI/Typography';

const { Header, Content } = Layout;
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

const userStorage = createStorage<IUser>('user-data', db.data);

const columns: ColumnsType<DataType> = [
  { title: '이름', dataIndex: 'name' },
  { title: '메모', dataIndex: 'memo' },
  { title: '가입일', dataIndex: 'joinDate' },
  { title: '직업', dataIndex: 'job' },
  { title: '이메일 수신 동의', dataIndex: 'isEmail' },
  { title: '', dataIndex: 'more', width: 48, align: 'center' },
];

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    token: { colorBgContainer },
  } = useToken();

  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const users = userStorage.get();

    const newData: DataType[] = users.map((user, index) => ({
      key: (index + 1).toString(),
      name: user.name,
      memo: user.memo,
      joinDate: user.joinDate,
      job: user.job,
      isEmail: <Checkbox name={`isEmail-${index}`} checked={user.isEmail} readOnly />,
      more: <DropdownAndMoreButton />,
    }));

    setData(newData);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUserSubmit = (user: IUser) => {
    userStorage.set([...userStorage.get(), user]);
    setIsModalOpen(false);
    setData([
      ...data,
      {
        key: (data.length + 1).toString(),
        name: user.name,
        memo: user.memo,
        joinDate: user.joinDate,
        job: user.job,
        isEmail: <Checkbox name={`isEmail-${data.length}`} checked={user.isEmail} readOnly />,
        more: <DropdownAndMoreButton />,
      },
    ]);
  };

  return (
    <>
      <MemberModal isModalOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleUserSubmit} />
      <HeaderWrapper bgColor={colorBgContainer}>
        <Typography level={5} mb="0px">
          회원 목록
        </Typography>
        <Button type="primary" icon={<Plus width="16" height="16" />} p="0px 14px" onClick={handleOpenModal}>
          추가
        </Button>
      </HeaderWrapper>
      <Content>
        <Table<DataType> data={data} columns={columns} showCheckbox={true} />
      </Content>
    </>
  );
};

export default Main;
