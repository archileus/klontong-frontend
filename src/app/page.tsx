'use client'
import { useFetch } from '@/hooks/useFetch';
import { ApiResponse, UserData } from '@/types';

export default function Home() {
  const { loading, data, error } = useFetch<ApiResponse>(`${process.env.API_URL}/isAuthenticatedUser`)
  const userData = data?.data as UserData;

  return (
    <main className="flex min-h-screen flex-col items-center p-24">

      <div className='text-xl'>Welcome <b>{userData?.name || ''}</b> to Klontong</div>

      <div className='mt-8'>Please navigate using menu at top right corner </div>
    </main>
  )
}
