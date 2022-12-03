import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import {useAudio} from "../components/Player";






const QRCode = (props) => {
    const [data, setData] = useState('No result');

    const [playing,toggle]=useAudio(require('../assets/beep.wav'))

    return (
        <div className='h-screen flex flex-col items-center justify-center font-mont'>

               <div className="w-3/4 flex items-center gap-10">
                   <div className="flex-1">
                       <QrReader
                           onResult={(result, error) => {
                               if (!!result) {
                                   toggle()
                                   setData(result?.text);
                               }

                               if (!!error) {
                                   console.info(error);
                               }
                           }}
                           style={{ width: '100%' }}
                       />
                   </div>
                   <div className="flex-1 flex items-center justify-center flex-col space-y-10">

                       <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                       </svg>
                       <span className="block text-4xl text-center">Scan Your Card</span>
                       <span className="block text-xl text-center text-p-100 font-bold">Full Qr Code must be visible in window</span>
                       <span className="block text-xl text-center text-p-100 font-bold">{data}</span>
                       <span className="block text-xs text-center text-p-100 font-bold">{playing ? 'Playing' : 'Paused'}</span>
                   </div>
           </div>
        </div>
    );
};

export default QRCode
