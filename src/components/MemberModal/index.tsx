import { Input, Select, theme } from 'antd';
import { jobListOption } from 'model/job-list';

import ILabelFormField from 'components/LabelFormField';
import Button from 'components/UI/Button';
import Checkbox from 'components/UI/Checkbox';
import DatePicker from 'components/UI/DatePicker';
import Flex from 'components/UI/Flex';
import Modal from 'components/UI/Modal';

const { TextArea } = Input;

const { useToken } = theme;

const MemberModal = () => {
  const { token } = useToken();

  return (
    <Modal
      isModalOpen
      title="회원 추가"
      footer={[
        <Button key="back">취소</Button>,
        <Button key="submit" type="primary">
          추가
        </Button>,
      ]}
    >
      <Flex vertical gap={`${token.marginMD}px`} pb={`${token.marginMD}px`}>
        <ILabelFormField label="이름" required>
          <Input placeholder="Input" status="error" />
        </ILabelFormField>
        <ILabelFormField label="주소">
          <Input placeholder="Input" />
        </ILabelFormField>
        <ILabelFormField label="메모">
          <TextArea placeholder="Textarea" />
        </ILabelFormField>
        <ILabelFormField label="가입일" required>
          <DatePicker placeholder="Select date" style={{ width: '162px' }} todayHidden />
        </ILabelFormField>
        <ILabelFormField label="직업">
          <Select placeholder="Select" options={jobListOption} style={{ width: '100px' }} />
        </ILabelFormField>
        <ILabelFormField label="이메일 수신 동의">
          <Checkbox name="email-agreement" />
        </ILabelFormField>
      </Flex>
    </Modal>
  );
};

export default MemberModal;
