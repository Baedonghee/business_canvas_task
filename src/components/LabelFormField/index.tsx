import { theme } from 'antd';

import Flex from 'components/UI/Flex';
import Text from 'components/UI/Text';

interface ILabelFormField {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  errorText?: string;
}

const { useToken } = theme;

const LabelFormField = ({ label, children, required = false, errorText }: ILabelFormField) => {
  const { token } = useToken();

  return (
    <Flex vertical>
      <Flex align="center">
        <Text fontSize={token.fontSizeLG} color={token.colorTextTertiary} mr={`${token.marginXXS}px`} fontWeight={token.fontWeightStrong}>
          {label}
        </Text>
        {required && (
          <Text fontSize={token.fontSizeLG} type="danger" fontWeight={token.fontWeightStrong}>
            *
          </Text>
        )}
      </Flex>
      <Flex mt={`${token.marginXS}px`}>{children}</Flex>
      {errorText && (
        <Text fontSize={token.fontSizeSM} type="danger">
          {errorText}
        </Text>
      )}
    </Flex>
  );
};

export default LabelFormField;
