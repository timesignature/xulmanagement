export default function InputComponent({title='',type='text',name='',onChange,value='',error=null,readOnly=false}){
    const change=(e)=>{

    }
    return (
        <label>
            <span className="block text-xs mb-3">{title}</span>
            {
                type==='textarea' ? (
                    <textarea
                        rows={4}
                        name={name}
                        onChange={onChange || change}
                        value={value}
                        readOnly={readOnly}
                        className={`input ${error ? 'border-red-600' : 'border-zinc-200'}`}
                    />
                ) : (
                    <input
                        type={type}
                        name={name}
                        onChange={onChange || change}
                        value={value}
                        readOnly={readOnly}
                        className={`input ${error ? 'border-red-600' : 'border-zinc-200'}`}
                    />
                )
            }
            {
                error && (
                    <span className="block text-xs text-red-600 mt-3">{error[0]}</span>
                )
            }
        </label>
    )
}
