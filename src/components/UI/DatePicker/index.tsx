import { useEffect } from 'react';
import { DatePicker as AntdDatePicker, DatePickerProps } from 'antd';

interface IDatePicker extends DatePickerProps {
  todayHidden?: boolean;
}

const DatePicker = ({ todayHidden = false, ...props }: IDatePicker) => {
  useEffect(() => {
    const footer = document.querySelector('.ant-picker-footer') as HTMLElement;
    if (footer) {
      footer.style.display = todayHidden ? 'none' : 'block';
    }
  }, [todayHidden]);

  return <AntdDatePicker {...props} />;
};

export default DatePicker;
