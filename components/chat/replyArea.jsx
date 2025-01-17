"use client"

import React, { useEffect, useRef } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { capitalizeFirstLetter, cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';


const ChatArea = React.forwardRef((props, ref) => {

    const { img, username, reply = true, replyingTo, handleaddComments, className , setOpenReplyArea} = props
    const textArea = useRef()

    useEffect(() => {
        setTimeout(() => {
            textArea.current.focus()
        }, 100);
    }, [])

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            // If Enter is pressed without Shift, submit the comment
            event.preventDefault(); // Prevents adding a new line
            if(setOpenReplyArea){
                setOpenReplyArea(prev=>!prev)
            }
            handleaddComments(textArea, replyingTo);
        }
    };

    return (
        <div ref={ref} className={cn('bg-white shadow-sm mx-5 md:mx-0 dark:text-black text-base px-5 py-4 flex flex-col-reverse md:flex-row rounded-md gap-6  bottom-0', className)}>
            <Avatar className='w-8 h-8'>
                <AvatarImage src={img} />
                <AvatarFallback className='dark:text-white'>{capitalizeFirstLetter(username)}</AvatarFallback>
            </Avatar>
            <div className='flex gap-3 w-full'>
                <Textarea ref={textArea} className="w-full resize-none focus-visible:ring-white focus:border-darkblue" placeholder="Add a comments..." onKeyPress={handleKeyPress} />
                <Button className="bg-modernblue hover:bg-opacity-50 hover:bg-modernblue-90 absolute bottom-3 right-10 md:static" onClick={(e) => handleaddComments(textArea, replyingTo, e)}>{reply ? "REPLY" : "SEND"}</Button>
            </div>
        </div>
    )
});

ChatArea.displayName = "ChatArea";

export default ChatArea
