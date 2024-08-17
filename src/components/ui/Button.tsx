import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, FC } from 'react';



const buttonVariant = cva(
    'active:scale-85 inline-flex item-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-event-none',
{
variants:{
    variant : {
      default: 'bg-green-700 text-white hover:bg-green-900',
      ghost: 'bg-transparent hover:text-green-900 hover:bg-green-200'
    },
    size:{
        default: 'h-10 py-2 px-4',
        sm:' h-9 px-2',
        lg: 'h-11 px-8',
    }  
},
defaultVariants:{
    variant:'default',
    size:'default'
}
}
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariant> {
    isLoading?:boolean
}



const Button: FC<ButtonProps> = ({ children ,className, variant,isLoading, size, ...props}) => {

    
  return <button className={cn(buttonVariant({variant, size, className}))} disabled={isLoading} {...props} >
    {isLoading ? <Loader2  className='h-4 w-4 animate-spin'/>: null }
     {children} </button>;
};

export default Button;