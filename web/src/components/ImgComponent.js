import {url} from "../config";

export default function ImgComponent({img}){
    return (
        <img
            src={`${url}/${img}`}
            alt=""
            className='w-full h-full object-cover'
        />
    )
}
