import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
    const navigate = useNavigate();
  return (
    <div className='w-full h-screen p-2 bg-slate-900 flex flex-col justify-center items-center'>
        <div className='w-[80%] h-fit p-2'>
            <div className='   text-center'>
                <h1 className=' animate-pulse text-[5.2em]  font-bold text-white font-Joffrey'>LIGHT N' SEEK</h1>
                <button className=' text-[2em] font-Joffrey px-6 text-slate-100  border-2 bg' onClick={()=>{
                    navigate('/Hero');
                }}>PLAY!</button>
            </div>

        </div>

    </div>
  )
}
