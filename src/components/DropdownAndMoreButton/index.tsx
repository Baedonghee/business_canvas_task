import { Dropdown, Flex } from 'antd';

import Button from 'components/UI/Button';
import More from 'components/UI/SVG/icons/more';
import Text from 'components/UI/Text';

interface IDropdownAndMoreButton {
  onEdit: () => void;
  onDelete: () => void;
  index: number;
}

const DropdownAndMoreButton = ({ onEdit, onDelete, index }: IDropdownAndMoreButton) => {
  return (
    <Dropdown
      trigger={['click']}
      overlayStyle={{
        width: '181px',
      }}
      menu={{
        items: [
          {
            key: `menu-edit-${index}`,
            label: (
              <Flex role="button" onClick={onEdit}>
                <Text>수정</Text>
              </Flex>
            ),
          },
          {
            type: 'divider',
          },
          {
            key: `menu-delete-${index}`,
            label: (
              <Flex role="button" onClick={onDelete}>
                <Text type="danger">삭제</Text>
              </Flex>
            ),
          },
        ],
      }}
    >
      <Button type="text" icon={<More width="16" height="16" />}></Button>
    </Dropdown>
  );
};

export default DropdownAndMoreButton;
