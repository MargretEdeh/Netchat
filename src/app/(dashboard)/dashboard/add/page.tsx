import AddFrienBtn from '@/components/AddFrienBtn';
import { FC } from 'react';

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  return <main className='p-8 '>
    <h1 className=' font-bold text-5xl mb-8'>Add an Amigo </h1>
    <AddFrienBtn/>
  </main>;
};

export default page;