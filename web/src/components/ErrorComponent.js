import ErrorSVG from "../assets/error.png";

export default function ErrorComponent(){
    return (
        <div className='p-10 flex flex-col items-center justify-center'>
            <img alt='' src={ErrorSVG} className='w-20 h-20 object-cover'/>
            <span className="block text-lg text-center mt-3">Something went wrong</span>
        </div>
    )
}
