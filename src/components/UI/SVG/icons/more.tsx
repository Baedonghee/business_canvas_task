import SVG, { type ISVG } from '..';

const More = ({ color = '#000000', ...rest }: ISVG) => {
  return (
    <SVG viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" {...rest}>
      <path
        d="M7.125 3.60938C7.125 3.84144 7.21719 4.064 7.38128 4.22809C7.54538 4.39219 7.76794 4.48438 8 4.48438C8.23206 4.48438 8.45462 4.39219 8.61872 4.22809C8.78281 4.064 8.875 3.84144 8.875 3.60938C8.875 3.37731 8.78281 3.15475 8.61872 2.99066C8.45462 2.82656 8.23206 2.73438 8 2.73438C7.76794 2.73438 7.54538 2.82656 7.38128 2.99066C7.21719 3.15475 7.125 3.37731 7.125 3.60938ZM7.125 7.98438C7.125 8.21644 7.21719 8.439 7.38128 8.60309C7.54538 8.76719 7.76794 8.85938 8 8.85938C8.23206 8.85938 8.45462 8.76719 8.61872 8.60309C8.78281 8.439 8.875 8.21644 8.875 7.98438C8.875 7.75231 8.78281 7.52975 8.61872 7.36566C8.45462 7.20156 8.23206 7.10937 8 7.10938C7.76794 7.10937 7.54538 7.20156 7.38128 7.36566C7.21719 7.52975 7.125 7.75231 7.125 7.98438V7.98438ZM7.125 12.3594C7.125 12.5914 7.21719 12.814 7.38128 12.9781C7.54538 13.1422 7.76794 13.2344 8 13.2344C8.23206 13.2344 8.45462 13.1422 8.61872 12.9781C8.78281 12.814 8.875 12.5914 8.875 12.3594C8.875 12.1273 8.78281 11.9048 8.61872 11.7407C8.45462 11.5766 8.23206 11.4844 8 11.4844C7.76794 11.4844 7.54538 11.5766 7.38128 11.7407C7.21719 11.9048 7.125 12.1273 7.125 12.3594V12.3594Z"
        fill={color}
        fillOpacity="0.65"
      />
    </SVG>
  );
};

export default More;
