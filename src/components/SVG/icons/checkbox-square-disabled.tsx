import SVG, { type ISVG } from '..';

const CheckboxSquareOn = ({ color = '#E3E3E3', ...rest }: ISVG) => {
  return (
    <SVG viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" {...rest}>
      <path
        d="M0.5 6C0.5 2.96243 2.96243 0.5 6 0.5H10C13.0376 0.5 15.5 2.96243 15.5 6V10C15.5 13.0376 13.0376 15.5 10 15.5H6C2.96243 15.5 0.5 13.0376 0.5 10V6Z"
        fill="black"
        fill-opacity="0.04"
        stroke={color}
      />
    </SVG>
  );
};

export default CheckboxSquareOn;
