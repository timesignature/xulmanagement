import EmptySVG from '../assets/empty.svg'
export default function EmptyComponent(){
    return (
        <div className='p-10 flex flex-col items-center justify-center'>

            <img alt='' src={EmptySVG} className='w-20 h-20 object-cover'/>
            <span className="block text-lg text-center mt-3">No Content</span>
        </div>
    )
}
