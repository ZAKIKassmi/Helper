"use client";
import { Button } from './ui/button'
import { LoadingSpinner } from './ui/loading-spinner';
import { useFormButtonStateToggle } from '@/hooks/form-button-state-toggle';

type Props = {
  placeholder?: string;
}

export default function SubmitButton({placeholder}: Props) {
  const pending = useFormButtonStateToggle((state)=>state.pending);
  return (
    <Button disabled={pending} className='bg-c-red-500 hover:bg-c-red-600'>
      {pending ? <LoadingSpinner className='stroke-white'/> : (placeholder || "Update your information")}
    </Button>
  )
}