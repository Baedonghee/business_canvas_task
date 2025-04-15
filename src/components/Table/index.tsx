import React from 'react';
import type { TableColumnsType, TableProps } from 'antd';
import { Table } from 'antd';

import Checkbox from 'components/Checkbox';

interface ITable<T extends { name: string }> {
  data: T[];
  columns: TableColumnsType<T>;
  showCheckbox?: boolean;
}

const TableComponent = <T extends { name: string }>({ data, columns, showCheckbox = true }: ITable<T>) => {
  const rowSelection: TableProps<T>['rowSelection'] = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log('selectedRowKeys:', selectedRowKeys, 'selectedRows:', selectedRows);
    },
    renderCell: (checked, record) => (showCheckbox ? <Checkbox name={record['name']} checked={checked} disabled={record['name'] === 'Disabled User'} /> : null),
  };

  const dynamicColumns = showCheckbox
    ? [
      {
        title: 'Select',
        dataIndex: 'select',
        render: (text: string, record: T) => <Checkbox name={record['name']} disabled={record['name'] === 'Disabled User'} />,
      },
      ...columns,
    ]
    : columns;

  return <Table rowSelection={rowSelection} columns={dynamicColumns} dataSource={data} rowKey="key" />;
};

export default TableComponent;
