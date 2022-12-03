export default function UploadComponent({image,setState,title='',errors=null}){

    const selectImage=(e)=>{
        setState(prev=>({
            ...prev,image:e.target.files[0]
        }))
    }

    return (
        <div>
            <label>
            <span className="block text-xs mb-3">
                {title}
            </span>
                <input type="file" hidden onChange={selectImage}/>
                {
                    image ? (
                        <div className='w-48 h-44'>
                            <img src={URL.createObjectURL(image)} className='w-full h-full rounded-lg object-cover' alt=""/>
                        </div>
                    ) : (
                        <div className={`w-48 h-44 border-2 border-dashed flex flex-col items-center justify-center ${errors ? 'border-red-600' : 'border-zinc-200'}`}>

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span className="block text-sm text-center mt-3">Upload Avatar</span>

                        </div>
                    )
                }
            </label>
            {
                errors && (
                    <span className="block text-xs text-red-600 mt-3">{errors[0]}</span>
                )
            }
        </div>
    )
}
