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
import TableFilter from 'components/UI/Table/TableFilter';
import Typography from 'components/UI/Title';

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

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useToken();

  const [data, setData] = useState<IUserDataType[]>([]);
  const [columns, setColumns] = useState<ColumnsType<IUserDataType>>([]);
  const [editUser, setEditUser] = useState<IEditUser | null>(null);
  const [filterKeys, setFilterKeys] = useState<{ [key: string]: React.Key[] }>({});

  useEffect(() => {
    const users = userStorage.get();
    const filtered = users.filter((user) => {
      return Object.keys(filterKeys).every((key) => {
        const filterValues = filterKeys[key];
        if (filterValues.length === 0) return true;
        return filterValues.includes(String(user[key as keyof IUser]));
      });
    });

    const mapped = filtered.map((user, i) => mapUserToDataType(user, i, handleEdit, handleDelete));

    setData(mapped);
    setColumns(createColumns(users, filterKeys));
  }, [filterKeys]);

  const createColumns = (sourceData: IUser[], filters: typeof filterKeys): ColumnsType<IUserDataType> => {
    const jobFilters = Array.from(new Set(sourceData.map((d) => d.job))).map((job) => ({
      text: job,
      value: job,
    }));

    const nameFilters = Array.from(new Set(sourceData.map((d) => d.name))).map((name) => ({
      text: name,
      value: name,
    }));

    const memoFilters = Array.from(new Set(sourceData.map((d) => d.memo).filter(Boolean))).map((memo) => {
      return {
        text: memo,
        value: memo,
      };
    });

    const joinDateFilters = Array.from(new Set(sourceData.map((d) => d.joinDate))).map((date) => ({
      text: date,
      value: date,
    }));

    const isEmailFilters = [
      { text: '선택됨', value: 'true' },
      { text: '선택 안함', value: 'false' },
    ];

    return [
      {
        title: '이름',
        dataIndex: 'name',
        filters: nameFilters,
        filteredValue: filters.name || [],
        filterDropdown: ({ setSelectedKeys, selectedKeys }) => (
          <TableFilter
            filters={nameFilters}
            selectedKeys={selectedKeys}
            onChange={(keys) => {
              setSelectedKeys(keys);
              setFilterKeys((prev) => ({ ...prev, name: keys }));
            }}
          />
        ),
      },
      {
        title: '메모',
        dataIndex: 'memo',
        filters: memoFilters,
        filteredValue: filters.memo || [],
        filterDropdown: ({ setSelectedKeys, selectedKeys }) => (
          <TableFilter
            filters={memoFilters}
            selectedKeys={selectedKeys}
            onChange={(keys) => {
              setSelectedKeys(keys);
              setFilterKeys((prev) => ({ ...prev, memo: keys }));
            }}
          />
        ),
      },
      {
        title: '가입일',
        dataIndex: 'joinDate',
        filters: joinDateFilters,
        filteredValue: filters.joinDate || [],
        filterDropdown: ({ setSelectedKeys, selectedKeys }) => (
          <TableFilter
            filters={joinDateFilters}
            selectedKeys={selectedKeys}
            onChange={(keys) => {
              setSelectedKeys(keys);
              setFilterKeys((prev) => ({ ...prev, joinDate: keys }));
            }}
          />
        ),
      },
      {
        title: '직업',
        dataIndex: 'job',
        filters: jobFilters,
        filteredValue: filters.job || [],
        filterDropdown: ({ setSelectedKeys, selectedKeys }) => (
          <TableFilter
            filters={jobFilters}
            selectedKeys={selectedKeys}
            onChange={(keys) => {
              setSelectedKeys(keys);
              setFilterKeys((prev) => ({ ...prev, job: keys }));
            }}
          />
        ),
      },
      {
        title: '이메일 수신 동의',
        dataIndex: 'isEmail',
        filters: isEmailFilters,
        filteredValue: filters.isEmail || [],
        filterDropdown: ({ setSelectedKeys, selectedKeys }) => (
          <TableFilter
            filters={isEmailFilters}
            selectedKeys={selectedKeys}
            onChange={(keys) => {
              setSelectedKeys(keys);
              setFilterKeys((prev) => ({ ...prev, isEmail: keys }));
            }}
          />
        ),
      },
      { title: '', dataIndex: 'more', width: 48, align: 'center' },
    ];
  };

  const handleDelete = useCallback(
    (index: number) => {
      userStorage.remove(index);
      const users = userStorage.get();
      setColumns(createColumns(users, filterKeys));
    },
    [filterKeys],
  );

  const handleEdit = useCallback((user: IUser, key: string) => {
    setEditUser({ key, user });
    setIsModalOpen(true);
  }, []);

  useEffect(() => {
    const users = userStorage.get();
    const mapped = users.map((user, i) => mapUserToDataType(user, i, handleEdit, handleDelete));
    setData(mapped);
    setColumns(createColumns(users, filterKeys));
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditUser(null);
  };

  const handleUserSubmit = (user: IUser) => {
    const updatedJobLabel = jobListOption.find((item) => item.value === user.job)?.label || '';
    const newUser = { ...user, job: updatedJobLabel };
    const users = userStorage.get();
    if (!editUser) {
      const newUsers = [...users, newUser];
      userStorage.set(newUsers);

      setColumns(createColumns(newUsers, filterKeys));
      setData(newUsers.map((user, i) => mapUserToDataType(user, i, handleEdit, handleDelete)));
    } else {
      const index = data.findIndex((d) => d.key === editUser.key);
      if (index !== -1) {
        const newUsers = users.map((u, i) => (i === index ? newUser : u));
        userStorage.set(newUsers);
        setColumns(createColumns(newUsers, filterKeys));
        setData(newUsers.map((user, i) => mapUserToDataType(user, i, handleEdit, handleDelete)));
      }
    }

    setIsModalOpen(false);
    setEditUser(null);
  };

  return (
    <>
      <MemberModal isModalOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleUserSubmit} editUser={editUser?.user} />
      <HeaderWrapper bgColor={token.colorBgContainer}>
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
