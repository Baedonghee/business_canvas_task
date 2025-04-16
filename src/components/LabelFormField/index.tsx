import { theme } from 'antd';

import Flex from 'components/UI/Flex';
import Text from 'components/UI/Text';

interface ILabelFormField {
  label: string;
  name: string;
  required?: boolean;
  children: React.ReactNode;
  errorMessage?: string;
}

const { useToken } = theme;

/**
 * 라벨 폼 필드
 * @param label 라벨
 * @param required 필수 여부
 * @param children 자식 요소
 * @param errorMessage 에러 메시지
 */
const LabelFormField = ({ label, required = false, children, errorMessage }: ILabelFormField) => {
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
      {errorMessage && (
        <Text fontSize={token.fontSizeSM} type="danger">
          {errorMessage}
        </Text>
      )}
    </Flex>
  );
};

export default LabelFormField;
