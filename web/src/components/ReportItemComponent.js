export default function ReportItemComponent({description='',amount='',children}){
    return (
        <div className='flex items-center space-x-5'>
            <div className="w-16 h-16 rounded-lg bg-p-100 flex items-center justify-center text-orange-100">{children}</div>
            <div className="flex-1">
                <span className="block text-xs">{description}</span>
                <span className="block text-base mt-1 font-medium">${(+amount).toFixed(2)}</span>
            </div>
        </div>
    )
}
