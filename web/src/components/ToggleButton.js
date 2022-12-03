export default function ToggleButton({toggle,setToggle}){


    const onChange=()=>{
        setToggle(toggle===1 ? 0 : 1)
    }


    return (
        <div>
            <button onClick={onChange} className={`focus:outline-none w-14 h-9 p-1 flex items-center rounded-full transition duration-75 ease-in-out ${toggle===1 ? 'bg-p-100 justify-end' : 'bg-zinc-200 '}`}>
                <div className="w-7 h-7 rounded-full bg-white shadow"></div>
            </button>
        </div>
    )
}
