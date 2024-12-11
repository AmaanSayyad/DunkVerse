import * as React from 'react';

const SvgComponent = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    style={{
      margin: 'auto',
      background: '0 0',
      display: 'block',
      shapeRendering: 'auto',
    }}
    width={75}
    height={75}
    viewBox='0 0 100 100'
    preserveAspectRatio='xMidYMid'
  >
    <circle
      cx={50}
      cy={50}
      fill='none'
      stroke='#17ff16'
      strokeWidth={6}
      r={43}
      strokeDasharray='202.63272615654165 69.54424205218055'
    >
      <animateTransform
        attributeName='transform'
        type='rotate'
        repeatCount='indefinite'
        dur='0.8333333333333334s'
        values='0 50 50;360 50 50'
        keyTimes='0;1'
      />
    </circle>
  </svg>
);

export default SvgComponent;
