import React, { useState } from 'react';
import type { TableColumnsType, TablePaginationConfig, TableProps } from 'antd';
import { Table as AntdTable } from 'antd';
import styled from 'styled-components';

import Checkbox from 'components/UI/Checkbox';

interface ITable<T extends { key: string }> extends Omit<TableProps<T>, 'dataSource' | 'columns' | 'rowSelection' | 'pagination'> {
  data: T[];
  columns: TableColumnsType<T>;
  showCheckbox?: boolean;
  pagination?: TablePaginationConfig | false;
}

const TableWrapper = styled.div`
  tbody .ant-table-selection-column {
    border-right: 1px solid rgba(0, 0, 0, 0.06);
  }
`;

/**
 * 테이블
 * @param data 데이터
 * @param columns 열
 * @param showCheckbox 체크박스 표시 여부
 * @param pagination 페이지네이션 여부
 */
const Table = <T extends { key: string }>({ data, columns, showCheckbox = true, pagination = false, ...props }: ITable<T>) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection: TableProps<T>['rowSelection'] = showCheckbox
    ? {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => {
          setSelectedRowKeys(newSelectedRowKeys);
        },
        // 헤더에 체크박스 추가
        columnTitle: (
          <Checkbox
            name="select-all"
            checked={data.length > 0 && selectedRowKeys.length === data.length}
            onChange={() => {
              const newSelectedRowKeys = selectedRowKeys.length === data.length ? [] : data.map((item) => (item as T).key);
              setSelectedRowKeys(newSelectedRowKeys);
            }}
          />
        ),
        // 커스텀 체크박스 랜더
        renderCell: (checked, record) => {
          return showCheckbox ? (
            <Checkbox
              name={record['key']}
              checked={checked}
              onChange={() => {
                const key = record['key'] as React.Key;
                // 체크 확인
                const newSelectedRowKeys = checked ? selectedRowKeys.filter((k) => k !== key) : [...selectedRowKeys, key];
                setSelectedRowKeys(newSelectedRowKeys);
              }}
            />
          ) : null;
        },
      }
    : undefined;

  return (
    <TableWrapper>
      <AntdTable rowSelection={rowSelection} columns={columns} dataSource={data} rowKey="key" pagination={pagination || false} {...props} />
    </TableWrapper>
  );
};

export default Table;
