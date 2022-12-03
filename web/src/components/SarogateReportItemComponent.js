export default function SarogateReportItemComponent(){
    return (
        <div className='flex items-center space-x-5'>
            <div className="w-16 h-16 animate-pulse rounded-lg bg-zinc-300 flex items-center justify-center text-orange-100"></div>
            <div className="flex-1">
                <div className="h-3 animate-pulse w-1/2 bg-zinc-200"></div>
                <div className="h-3 animate-pulse w-1/4 bg-zinc-200 mt-1"></div>
            </div>
        </div>
    )
}
