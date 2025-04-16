import { useCallback } from 'react';
import { DatePicker as AntdDatePicker, DatePickerProps } from 'antd';

interface IDatePicker extends DatePickerProps {
  todayHidden?: boolean;
}

/**
 * 날짜 선택기
 * @param todayHidden 오늘 숨김 여부
 * @param props 속성
 */
const DatePicker = ({ todayHidden = false, ...props }: IDatePicker) => {
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        setTimeout(() => {
          const footer = document.querySelector('.ant-picker-footer') as HTMLElement;
          if (footer) {
            footer.style.display = todayHidden ? 'none' : 'block';
          }
        }, 0);
      }
    },
    [todayHidden],
  );

  return <AntdDatePicker {...props} onOpenChange={handleOpenChange} />;
};

export default DatePicker;
