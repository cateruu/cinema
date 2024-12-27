'use client';

import { Upload } from 'lucide-react';
import Image from 'next/image';
import React, { ChangeEvent, useRef, useState } from 'react';

const ThumbnailUpload = () => {
  const [thumbnail, setThumbnail] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setThumbnail(window.URL.createObjectURL(file));
      }
    }
  };

  return (
    <>
      <div
        onClick={handleFileUpload}
        className='group w-full aspect-square rounded-xl p-2 flex flex-col items-center justify-center gap-2 bg-slate-950 cursor-pointer relative max-w-[500px] md:order-2'
      >
        {thumbnail ? (
          <>
            <Image
              src={thumbnail}
              alt='uploaded thumbnail'
              width={500}
              height={500}
              className='w-full aspect-square object-cover rounded-lg'
            />
            <div
              style={{
                width: 'calc(100% - 16px)',
                height: 'calc(100% - 16px)',
              }}
              className='w-full h-full z-10 bg-slate-900 opacity-85 absolute top-0 left-0 m-2 rounded-lg hidden group-hover:flex flex-col items-center justify-center'
            >
              <Upload />
              <p className='text-lg font-bold'>Upload new</p>
            </div>
          </>
        ) : (
          <>
            <Upload size={30} />
            <p className='font-bold'>Select thumbnail image to upload.</p>
            <p className='text-sm font-medium text-slate-700'>
              Allowed extensions: PNG, JPEG, WEBP
            </p>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        onChange={handleThumbnailChange}
        type='file'
        name='thumbnail'
        id='thumbnail'
        hidden
        accept='.png,.jpeg,.jpg,.webp'
      />
    </>
  );
};

export default ThumbnailUpload;
