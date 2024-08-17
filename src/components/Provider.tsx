import { FC, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

interface ProviderProps {
  children : ReactNode
}

const Provider: FC<ProviderProps> = ({children}) => {
  return (
    <>
    <Toaster position='top-right' reverseOrder={true}  />
    {children}
    </>
  )
};

export default Provider;