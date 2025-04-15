import { Flex, Input, theme } from 'antd';

import Text from 'components/UI/Text';

interface IInputLabel {
  label: string;
}

const { useToken } = theme;

const InputLabel = ({ label }: IInputLabel) => {
  const { token } = useToken();
  return (
    <Flex vertical>
      <Flex align="center">
        <Text fontSize={token.fontSizeLG}>{label}</Text>
        <Text type="danger">*</Text>
      </Flex>
      <Input />
    </Flex>
  );
};

export default InputLabel;
