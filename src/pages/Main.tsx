import { useCallback, useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import db from 'common/db.json';
import { jobListOption } from 'model/job-list';
import styled from 'styled-components';
import { IEditUser, IUser, IUserDataType } from 'types/user';
import { mapUserToDataType } from 'utils/mapUserToDataType';
import { createStorage } from 'utils/storage';

import MemberModal from 'components/MemberModal';
import Button from 'components/UI/Button';
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

const userStorage = createStorage<IUser>('user-data', db.data);

const columns: ColumnsType<IUserDataType> = [
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

  const [data, setData] = useState<IUserDataType[]>([]);
  const [editUser, setEditUser] = useState<IEditUser | null>(null);

  const handleDelete = useCallback((index: number) => {
    userStorage.remove(index);
    setData((prevData) => prevData.filter((_, i) => i !== index));
  }, []);

  const handleEdit = useCallback((user: IUser, key: string) => {
    setEditUser({ key, user });
    setIsModalOpen(true);
  }, []);

  useEffect(() => {
    const users = userStorage.get();
    const newData = users.map((user, index) => mapUserToDataType(user, index, handleEdit, handleDelete));
    setData(newData);
  }, [handleDelete, handleEdit]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditUser(null);
  };

  const handleUserSubmit = (user: IUser) => {
    const newUser = {
      ...user,
      job: jobListOption.find((item) => item.value === user.job)?.label || '',
    };

    if (!editUser) {
      const updatedUsers = [...userStorage.get(), newUser];
      userStorage.set(updatedUsers);
      const newIndex = data.length;

      setData([...data, mapUserToDataType(newUser, newIndex, handleEdit, handleDelete)]);
    } else {
      const index = data.findIndex((item) => item.key === editUser.key);
      if (index !== -1) {
        const updatedUsers = userStorage.get().map((item, i) => (i === index ? user : item));
        userStorage.set(updatedUsers);

        setData((prevData) => prevData.map((item, i) => (i === index ? mapUserToDataType(newUser, index, handleEdit, handleDelete) : item)));
      }
    }

    setIsModalOpen(false);
    setEditUser(null);
  };

  return (
    <>
      <MemberModal isModalOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleUserSubmit} editUser={editUser?.user} />
      <HeaderWrapper bgColor={colorBgContainer}>
        <Typography level={5} mb="0px">
          회원 목록
        </Typography>
        <Button type="primary" icon={<Plus width="16" height="16" />} p="0px 14px" onClick={handleOpenModal}>
          추가
        </Button>
      </HeaderWrapper>
      <Content>
        <Table<IUserDataType> data={data} columns={columns} showCheckbox={true} size="small" />
      </Content>
    </>
  );
};

export default Main;
