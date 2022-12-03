import {Link} from "react-router-dom";

export default function GoToAddButtonComponent({url=''}){
    return (
        <Link to={url}>
            <div className="w-10 h-10 bg-zinc-50 text-p-100 items-center justify-center flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            </div>
        </Link>
    )
}
