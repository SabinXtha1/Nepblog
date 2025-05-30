'use client'
import { SignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return (
    <>
      <div
        className='h-screen w-full flex justify-center items-center'
        onClick={() => router.push('/')}
      >
        <SignIn  />
      </div>
    </>
  );
}
