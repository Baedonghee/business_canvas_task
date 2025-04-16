import { useEffect } from 'react';
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
  useEffect(() => {
    const footer = document.querySelector('.ant-picker-footer') as HTMLElement;
    if (footer) {
      setTimeout(() => {
        footer.style.display = todayHidden ? 'none' : 'block';
      }, 100);
    }
  }, [todayHidden]);

  return <AntdDatePicker {...props} />;
};

export default DatePicker;
