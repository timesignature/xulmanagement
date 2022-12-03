export default function SelectComponent({title='',name='',onChange=null,value='',error=null,data=[]}){
    return (
        <label>
            <span className="block text-xs mb-3">{title}</span>
            <select
                name={name}
                onChange={onChange}
                value={value}
                className={`input ${error ? 'border-red-600' : 'border-zinc-200'}`}
            >
                <option value="">Select</option>
                {
                    data.map((d,i)=>(
                        <option key={i} value={d}>{d}</option>
                    ))
                }
            </select>
            {
                error && (
                    <span className="block text-xs text-red-600 mt-3">{error[0]}</span>
                )
            }
        </label>
    )
}
