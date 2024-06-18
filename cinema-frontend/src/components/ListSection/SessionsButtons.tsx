import React from 'react'
import { motion, useAnimate } from "framer-motion";


type Props = {}

const SessionsButtons = (props: Props) => {
    const [scope, animate] = useAnimate()
    const handleMouseEnter = () => {
        animate(scope.current, { top: 0 });
    };

    const handleMouseLeave = () => {
        animate(scope.current, { top: -40 });
    };

    return (
        <div className='relative overflow-hidden'>
            <button className='w-[100px] h-[40px] bg-transparent border-blue-600 border rounded-lg font-bold text-xl'
                onMouseEnter={handleMouseEnter}
            >12:00</button>
            <div onMouseLeave={handleMouseLeave} ref={scope}
                className='absolute w-[100px] cursor-pointer  font-bold border-blue-600 border flex justify-center items-center h-[40px] rounded-lg top-[-40px] bg-blue-600'>
                    COMPRAR!</div>
        </div>
    )
}

export default SessionsButtons