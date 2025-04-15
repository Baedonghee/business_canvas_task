import { Dropdown } from 'antd';

import Button from 'components/UI/Button';
import More from 'components/UI/SVG/icons/more';
import Text from 'components/UI/Text';

const DropdownAndMoreButton = () => {
  return (
    <Dropdown
      trigger={['click']}
      overlayStyle={{
        width: '181px',
      }}
      menu={{
        items: [
          { key: '1', label: <Text>수정</Text> },
          {
            type: 'divider',
          },
          { key: '2', label: <Text type="danger">삭제</Text> },
        ],
      }}
    >
      <Button type="text" icon={<More width="16" height="16" />}></Button>
    </Dropdown>
  );
};

export default DropdownAndMoreButton;
