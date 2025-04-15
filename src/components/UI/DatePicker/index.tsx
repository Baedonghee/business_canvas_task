import { useEffect } from 'react';
import { DatePicker as AntdDatePicker, DatePickerProps } from 'antd';

interface IDatePicker extends DatePickerProps {
  todayHidden?: boolean;
}

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
