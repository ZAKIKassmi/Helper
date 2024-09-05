import { type ClassValue, clsx } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formErrorHandling(state:any, form:any){
  if(Array.isArray(state) && state?.length > 0){
    state.forEach((issue: {name: any, errorMessage: string, isToast: boolean, isError:boolean})=>{
        if(!issue.isToast){
            form.setError(issue.name, {
                message: issue.errorMessage
            })
        }
        else if(issue.isToast && issue.isError){
            toast.error(issue.errorMessage);
        }
        else if(issue.isToast && !issue.isError){
            toast.success(issue.errorMessage);
        }
    });
}
}
