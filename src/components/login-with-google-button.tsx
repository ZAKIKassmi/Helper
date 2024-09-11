import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'



export default function LoginWithGoogleButton() {
  return (
    <Link href='/api/google'>
                
      <Button className='w-full bg-white border border-n-50 flex gap-3 hover:bg-n-20 justify-center items-center'>
      <Image src="/icons/google.svg" width={24} height={24} alt='Google icon for siging up with oauth2.0'/>
      <p className='text-n-70 text-label-n font-medium'> Sign up with Google</p>
      
      </Button>
  </Link>
  )
}