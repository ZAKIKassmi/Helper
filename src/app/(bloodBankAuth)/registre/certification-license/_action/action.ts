"use server";
import { db } from "@/drizzle/db";
import { certifications } from "@/drizzle/schema";
import { validateBloodBankRequest } from "@/lib/auth";
import { certificationSchema, TCertificationSchema } from "@/lib/types";
import { redirect } from "next/navigation";
import fs from "node:fs/promises";
import path from "path";
import { v4 as uuidv4 } from 'uuid'; 


type CertificationNameTypes = keyof TCertificationSchema;

export async function addCertifications(_:any, formData: FormData):Promise<{name: CertificationNameTypes, errorMessage: string, isToast: boolean,isError:boolean}[]> {

    const {user} = await validateBloodBankRequest();
    if(!user){
      return [
        {
          name: "expiryDate",
          isToast: true,
          isError: true,
          errorMessage: "Only authenticated blood banks are authorized to make this request."
        }
      ]
    }
  


  const files = formData.getAll('file') as File[];
  const licenseNumber = formData.get('licenseNumber') as string;
  const expiryDate = new Date(formData.get('expiryDate') as string).toISOString().split('T')[0];

  

  if(files.length === 0){
    return[
      {
        isError: true,
        isToast: true,
        errorMessage: "Certification is required",
        name: "certifications"
      }
    ]
  }

  const result = certificationSchema.safeParse({
    files,
    licenseNumber,
    expiryDate
  });
  let errors: {name:  CertificationNameTypes, errorMessage: string, isToast:boolean, isError: boolean}[] = [];
  
  if(!result.success){
    result.error.issues.forEach((issue)=>{
        errors = [...errors, {name: issue.path[0] as CertificationNameTypes, errorMessage: issue.message,isToast: false, isError: true}]
    });
    return errors;
  }

  

  
  const promises:string[] = [];

  try{
    for(const file of files){
      const uuid = uuidv4();
      const fileExtension = path.extname(file.name);
      const fileName = `${uuid}${fileExtension}`;  
      
      const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
      //to handle the binary data
      const arrayBuffer = await file.arrayBuffer();
      //Convert the ArrayBuffer into a Node.js Buffer
      //to optimize binary operations
      const buffer = Buffer.from(arrayBuffer);
      //write the file into the specific folder
      await fs.writeFile(filePath, buffer);
      promises.push(filePath);
    }
  }
  catch(e){
    return [{
      name: "certifications",
      errorMessage: "Failed to upload the files",
      isToast: true,
      isError: true
  }];
  }

  try{
      await db.insert(certifications).values({
        licenseNumber,
        expiryDate,
        certificationUrl1: promises[0],
        certificationUrl2: promises[1] || null,
        certificationUrl3: promises[2] || null,
        bloodBankId: user.id,
      })
    }
  
  catch(e){
    return[{
      name: 'certifications',
      errorMessage: "Could not insert certifications",
      isError: true,
      isToast: true,
    }]
  }
  
  return [
    {
      name: "expiryDate",
      errorMessage: "certifications have been successfully registered.",
      isError: false,
      isToast: true,
    }
  ]
}