import React from 'react';

interface Props {
  text: string;
  isLoading: boolean;
}

const LoadingButton = ({ text, isLoading }: Props) => {
  return (
    <button
      disabled={isLoading}
      className='w-full h-11 bg-orange-400 rounded-xl font-bold flex justify-center items-center disabled:bg-orange-400'
    >
      {isLoading ? (
        <svg
          width='24'
          height='24'
          viewBox='-15 -15 150 150'
          className='animate-spin'
        >
          <circle
            r='50'
            cx='60'
            cy='60'
            fill='transparent'
            stroke='#fff7ed'
            strokeWidth='16px'
            strokeDasharray='314px'
            strokeDashoffset='0'
          ></circle>
          <circle
            r='50'
            cx='60'
            cy='60'
            stroke='#b45309'
            strokeWidth='16px'
            strokeLinecap='round'
            strokeDashoffset='251px'
            fill='transparent'
            strokeDasharray='314px'
          ></circle>
        </svg>
      ) : (
        text
      )}
    </button>
  );
};

export default LoadingButton;
