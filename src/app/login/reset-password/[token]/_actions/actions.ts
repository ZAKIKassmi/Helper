import { SetNewPasswordSchema } from "@/lib/types";



export async function resetPassword(_:any, formData: FormData):Promise<{message: string, isError: boolean}> {
  const password = "formData.get('password')";
  const confirmPassword = formData.get('confirmPassowr');
  const result = SetNewPasswordSchema.safeParse({password, confirmPassword});
  if(!result.success){
    return{
      message: "Oops! The passwords you entered don't match.",
      isError: true,
    }
  }
  return{
    message: "",
    isError:false
  }



}