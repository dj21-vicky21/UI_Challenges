'use client'

import React, { useState } from 'react'
import { FaPlus, FaMinus } from "react-icons/fa";

export default function Scorebtn(props) {
    const [scoreValue, setScorevalue] = useState(props.score)

    const handleIncrease = () => {
        setScorevalue(prev => prev += 1)
    }
    const handleDecrease = () => {
        if (scoreValue > 0) setScorevalue(prev => prev -= 1)
    }

    return (
        <>
            <span className='text-blueishgray hover:text-modernblue p-1 w-5 cursor-pointer' onClick={(e)=>handleIncrease()}><FaPlus size={12} /></span>
            <span className='text-modernblue font-medium w-5 text-center'>{scoreValue}</span>
            <span className='text-blueishgray hover:text-modernblue p-1 w-5 cursor-pointer' onClick={(e)=>handleDecrease()}><FaMinus size={12} /></span>
        </>
    )
}
