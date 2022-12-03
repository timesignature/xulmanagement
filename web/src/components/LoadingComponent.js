import CircularProgress from "react-cssfx-loading/lib/CircularProgress";
import React from "react";

export default function LoadingComponent(){
    return (
        <div className='p-10 flex items-center justify-center bg-white bg-opacity-50'>
            <CircularProgress color="#FF0000" width="50px" height="50px" duration="3s" />
        </div>
    )
}
