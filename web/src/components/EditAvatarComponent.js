import {url} from "../config";
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {success} from "./ToastComponent";
import {useState} from "react";

export default function EditAvatarComponent({title='Photo',image,invalidate=[],link=''}){





    const [errors,setErrors]=useState({})

    const queryClient=useQueryClient()

    const mutation=useMutation(values=>http.post(`${link}`,values).then(res=>res.data),{
        onSuccess:async()=>{
            setErrors({})
            await queryClient.invalidateQueries(invalidate)
            success('profile image has been successfully updated')
        },
        onError:(e)=>{
            setErrors(e.response.data.errors || {})
        }
    })





    const selectImage=(e)=>{
        const fd=new FormData()
        fd.append('image',e.target.files[0])
        mutation.mutate(fd)
    }


    return (
       <div>
           <div className='relative'>
               {
                   mutation.isLoading && (
                       <div className="absolute inset-0 flex items-center justify-center z-10">
                           <span className="block text-xs text-center">...Loading</span>
                       </div>
                   )
               }
               <label>
            <span className="block text-sm mb-3">
                {title}
            </span>
                   <input type="file" hidden onChange={(e)=>mutation.isLoading ? null : selectImage(e)}/>
                   {
                       image ? (
                           <div className='w-48 h-44'>
                               <img src={`${url}/${image}`}
                                    className='w-full h-full rounded-lg object-cover'
                                    alt=""
                               />
                           </div>
                       ) : (
                           <div className={`w-48 h-44 border-4 border-dashed flex flex-col items-center justify-center ${errors.image ? 'border-red-600' : 'border-zinc-200'}`}>

                               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                   <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                               </svg>
                               <span className="block text-sm text-center mt-3">Upload Avatar</span>

                           </div>
                       )
                   }
               </label>
               {
                   errors.image && (
                       <span className="block text-xs text-red-600 mt-3">{errors.image[0]}</span>
                   )
               }
           </div>
       </div>
    )
}
