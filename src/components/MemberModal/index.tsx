import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Input, Select, theme } from 'antd';
import dayjs from 'dayjs';
import { jobListOption } from 'model/job-list';
import { IUser } from 'types/user';

import LabelFormField from 'components/LabelFormField';
import Button from 'components/UI/Button';
import Checkbox from 'components/UI/Checkbox';
import DatePicker from 'components/UI/DatePicker';
import Flex from 'components/UI/Flex';
import Modal from 'components/UI/Modal';
const { TextArea } = Input;

const { useToken } = theme;

interface IMemberModal {
  isModalOpen: boolean;
  editUser?: IUser | null;
  onClose: () => void;
  onSubmit: (user: IUser) => void;
}

const MemberModal = ({ isModalOpen, editUser, onClose, onSubmit }: IMemberModal) => {
  const { token } = useToken();
  const {
    control,
    handleSubmit: handleSubmitForm,
    trigger,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      address: '',
      memo: '',
      joinDate: '',
      job: jobListOption[0].value,
      isEmail: false,
    },
  });

  useEffect(() => {
    if (editUser) {
      reset(editUser);
      trigger();
    } else {
      reset({
        name: '',
        address: '',
        memo: '',
        joinDate: '',
        job: jobListOption[0].value,
        isEmail: false,
      });
    }
  }, [editUser, reset, trigger]);

  const handleSubmit = handleSubmitForm((values) => {
    onSubmit(values);
  });

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      title={editUser ? '회원 수정' : '회원 추가'}
      onCancel={handleClose}
      footer={[
        <Button key="back" onClick={handleClose}>
          취소
        </Button>,
        <Button key="submit" type="primary" htmlType="submit" onClick={handleSubmit} disabled={!isValid}>
          {editUser ? '수정' : '추가'}
        </Button>,
      ]}
    >
      <form>
        <Flex vertical gap={`${token.marginMD}px`} pb={`${token.marginMD}px`}>
          <LabelFormField label="이름" name="name" required errorMessage={errors.name?.message}>
            <Controller
              control={control}
              rules={{ required: '이름을 입력해주세요.' }}
              name="name"
              render={({ field }) => <Input placeholder="Input" {...field} status={errors.name ? 'error' : ''} />}
            />
          </LabelFormField>
          <LabelFormField label="주소" name="address" errorMessage={errors.address?.message}>
            <Controller
              control={control}
              rules={{
                maxLength: {
                  value: 20,
                  message: '글자수 20을 초과할 수 없습니다.',
                },
              }}
              name="address"
              render={({ field }) => <Input placeholder="Input" {...field} status={errors.address ? 'error' : ''} />}
            />
          </LabelFormField>
          <LabelFormField label="메모" name="memo" errorMessage={errors.memo?.message}>
            <Controller
              control={control}
              rules={{
                maxLength: {
                  value: 50,
                  message: '글자수 50을 초과할 수 없습니다.',
                },
              }}
              name="memo"
              render={({ field }) => <TextArea placeholder="Textarea" {...field} status={errors.memo ? 'error' : ''} />}
            />
          </LabelFormField>
          <LabelFormField label="가입일" name="joinDate" required errorMessage={errors.joinDate?.message}>
            <Controller
              control={control}
              name="joinDate"
              rules={{ required: '가입일을 선택해주세요.' }}
              render={({ field }) => (
                <DatePicker
                  placeholder="Select date"
                  style={{ width: '162px' }}
                  todayHidden
                  {...field}
                  value={field.value ? dayjs(field.value) : undefined}
                  status={errors.joinDate ? 'error' : ''}
                  onChange={(value) => field.onChange(dayjs(value).format('YYYY-MM-DD'))}
                />
              )}
            />
          </LabelFormField>
          <LabelFormField label="직업" name="job">
            <Controller
              control={control}
              name="job"
              render={({ field }) => <Select placeholder="Select" options={jobListOption} style={{ width: '100px' }} {...field} />}
            />
          </LabelFormField>
          <LabelFormField label="이메일 수신 동의" name="isEmail">
            <Controller
              control={control}
              name="isEmail"
              render={({ field }) => <Checkbox name={field.name} checked={field.value} onChange={field.onChange} />}
            />
          </LabelFormField>
        </Flex>
      </form>
    </Modal>
  );
};

export default MemberModal;
