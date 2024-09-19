import React, { useState } from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import UploadIcon from './icons/upload';

type Props = {
  form: any;
  name:string;
  description?: string;
  label?:string;
  placeholder?: string;
}

export default function CustomUpload({form, name, description, label, placeholder}: Props) {
  const [fileInputName, setFileInputName] = useState<string[]>([placeholder || "upload"]);
  const fileRef = form.register(name);

  return (
    <FormField
          name={name}
          control={form.control}
          render={({field})=>(
          <FormItem>
            {
              label && <FormLabel>
                {label}
              </FormLabel>
            }
              <FormControl>
                <div className='w-full border rounded-lg relative  py-2 flex pl-2 gap-2 items-center hover:border-n-70 duration-200'>
                  <UploadIcon/>
                  <p className='text-left w-full font-normal gap-2 flex justify-start text-label-s file:bg-transparent file:text-sm file:font-medium text-muted-foreground 
                  ' >
                    {fileInputName}
                  </p>
                  <Input className='focus-visible:ring-n-40 left-0 opacity-0 absolute top-0 focus-visible:ring-offset-n-40' type="file" {...fileRef} multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setFileInputName(files.map(file => `${file.name?.split('\\').pop()}, ` || ''));
                    }}
                  />
                </div>
              </FormControl>
              {
                description &&
                <FormDescription>
                  You can upload up to 3 certifications
                </FormDescription>
              }
              <FormMessage />
          </FormItem>  
          )}
        />
  )
}