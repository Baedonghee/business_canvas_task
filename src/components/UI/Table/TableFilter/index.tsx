import { theme } from 'antd';
import type { ColumnFilterItem } from 'antd/es/table/interface';

import Checkbox from 'components/UI/Checkbox';
import Flex from 'components/UI/Flex';

const { useToken } = theme;

interface ITableFilter {
  filters: ColumnFilterItem[];
  selectedKeys: React.Key[];
  onChange: (keys: React.Key[]) => void;
}

const TableFilter = ({ filters, selectedKeys, onChange }: ITableFilter) => {
  const { token } = useToken();
  return (
    <Flex vertical p={`${token.paddingXS}px`}>
      {filters.map((filter, index) => (
        <Checkbox
          key={filter.value?.toString()}
          name={filter.value?.toString()}
          p={`${token.paddingXXS}px ${token.paddingXS}px`}
          mb={index === filters.length - 1 ? '0px' : `${token.marginXS}px`}
          checked={selectedKeys.includes(filter.value as React.Key)}
          isFilter
          onChange={(checked) => {
            if (checked) {
              onChange([...selectedKeys, filter.value as React.Key]);
            } else {
              onChange(selectedKeys.filter((key) => key !== (filter.value as React.Key)));
            }
          }}
        >
          {filter.text}
        </Checkbox>
      ))}
    </Flex>
  );
};

export default TableFilter;
