import fs  from 'node:fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; 



export async function createFilePath(picture: File, type: string):Promise<string> {
  const uuid = uuidv4();
  const fileExtension = path.extname(picture.name);
  const fileName = `${uuid}${fileExtension}`;
  const filePath = path.join(process.cwd(), 'public', 'uploads', `${type}`, fileName);

  try{
    const arrayBuffer = await picture.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);
    return filePath;
  }
  catch{
    return '';
  }
  
}