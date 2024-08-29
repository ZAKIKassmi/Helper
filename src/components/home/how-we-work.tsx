import CustomCard from "../customCard";


export default function HowWeWork() {
  
  return (
    <div className="lg:px-40 lg:py-20">
      <h1 className='text-h1-d font-semibold'>How Helper Works?</h1>
      <CustomCard title="1. Create an account" description="Sign up easily and join our community by filling out a simple registration form." isSignUp={true}/>
    </div>
  )
}