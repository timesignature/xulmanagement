export default function ReportStudComponent({description='',val='',children}){
    return (
        <div className='flex items-center space-x-5'>
            <div className="w-16 h-16 rounded-lg bg-zinc-900 flex items-center justify-center text-white">{children}</div>
            <div className="flex-1">
                <span className="block text-xs">{description}</span>
                <span className="block text-base mt-1 font-medium">{val}</span>
            </div>
        </div>
    )
}
