// pages/404.js
import Home from '@/app/Home';
import Image from 'next/image';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className='text-center my-10'>
      <h1 className='text-lg md:text-2xl font-bold'>Page Not Found!</h1>
      <h1 className='text-lg md:text-2xl font-bold my-3'>Sorry, the page you are looking for does not exist.</h1>
      <div className='flex justify-center h-full w-full'>
        <Image 
        className='h-[300px] w-[400px]'
        src="/assets/not-found.png"
        alt='404-page'
        width={500}
        height={500}
        />
      </div>
      <div className='flex justify-center p-4'>
      <Link href="/">
        <button className='hover:bg-[#FF0000] p-3 border border-white rounded-lg font-bold bg-white hover:text-white hover:border-[#FF0000] shadow-md'>Go to homepage</button>
      </Link>
      </div>
    </div>
  );
};

export default Custom404;
