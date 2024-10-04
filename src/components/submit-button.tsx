"use client";
import { Button } from './ui/button'
import { useFormStatus } from 'react-dom'
import { LoadingSpinner } from './ui/loading-spinner';
import { useFormButtonStateToggle } from '@/hooks/form-button-state-toggle';

type Props = {}

export default function SubmitButton({}: Props) {
  const pending = useFormButtonStateToggle((state)=>state.pending);
  return (
    <Button disabled={pending} className='bg-c-red-500 hover:bg-c-red-600'>
      {pending ? <LoadingSpinner className='stroke-white'/> : "Update information"}
    </Button>
  )
}