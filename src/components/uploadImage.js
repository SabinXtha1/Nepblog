'use client'
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from './ui/button';
 

 const  UploadImage =({setImages})=> {

   return  (<CldUploadWidget uploadPreset="blogimg"  onSuccess={(result,info)=>{
    setImages((prev) => [...prev, result.info.secure_url]);
    console.log("result",result,"info",info)}} 
 onUploadAdded={()=>console.log('hello')
 }
    >
  {({ open }) => {
      return (
          <Button onClick={() => open()}>
        Upload an Image
      </Button>
    );
}}
</CldUploadWidget>)
}

export default UploadImage;