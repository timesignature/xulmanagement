export default function InvoiceHeadingComponent(){
    return (
        <div className="flex items-center justify-between py-5 border-b border-p-100">
            <div>
                <span className="block text-base font-medium">MNB College</span>
                <span className="block text-xs mt-1">Stand No. 1 Warwick RD Chegutu <br/> <span className="text-indigo-500">+263 774 856 252</span> / <span className='text-indigo-500'>+263 771 407 677</span></span>
            </div>
            <div className='w-16 h-16 rounded-lg bg-zinc-100 p-2'>
                <img
                    src={require('../assets/logo.png')}
                    className='w-full w-full object-cover'
                    alt=""
                />
            </div>
        </div>
    )
}
