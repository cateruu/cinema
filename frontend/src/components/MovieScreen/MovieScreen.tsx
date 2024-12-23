import React from 'react';

const MovieScreen = () => {
  return (
    <svg
      width='586'
      height='164'
      viewBox='0 0 586 164'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='w-full -mt-10'
    >
      <g filter='url(#filter0_d_4_182)'>
        <path
          d='M62 102C62 102 110.767 62 291.973 62C473.18 62 524 102 524 102'
          stroke='#FB923C'
          strokeWidth='4'
          strokeLinecap='round'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_4_182'
          x='-6.10352e-05'
          y='0'
          width='586'
          height='164'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='30' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.984314 0 0 0 0 0.572549 0 0 0 0 0.235294 0 0 0 1 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_4_182'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_4_182'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};

export default MovieScreen;
