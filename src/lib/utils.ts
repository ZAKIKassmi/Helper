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


export function findTheClosestBloodCenter(
    items: {name: string, latitude: number, longitude:number}[],
    latitude: number,
    longitude: number
):string{
        let minLat = 1000;
        let minLon = 1000;
        let name = "";
          items.forEach((bank)=>{
            if(bank.latitude < 0 || bank.longitude < 0){
              bank.latitude = -(bank.latitude);
              bank.longitude = -(bank.longitude);
            }
            if(bank.latitude > latitude){
              const result = (bank.latitude - latitude);
              if(result < minLat){
                minLat = result;
                name = bank.name                 
              }
            }
            else{
              const result = (latitude - bank.latitude);
              if(result < minLat){
                minLat = result;
                name = bank.name
              }
            }
            if(bank.longitude > longitude){
              const result = bank.longitude - longitude;
              if(result < minLon){
                minLon = result;
              }
            }
            else{
              const result =  longitude - bank.longitude;
              if(result < minLon){
                minLon = result;
                name = bank.name
              }
            }
          })
          return name;
        
}
