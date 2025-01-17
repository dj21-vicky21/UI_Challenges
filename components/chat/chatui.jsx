"use client"

import { FaReply, FaTrash, FaPen } from "react-icons/fa";
import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import Scorebtn from "@/components/chat/scorebtn";
import ChatArea from "@/components/chat/replyArea";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"

function Chatui(props) {
    const { id, currentuser, content, createdAt, username, score, img, className, replyingTo, handleaddComments, handledeletecomment } = props

    const { image: currentuserimage, username: currentUsername } = currentuser

    const commentArea = useRef(null)
    const replyArearef = useRef(null)
    const updateArearef = useRef(null)

    const [editMode, setEditMode] = useState(false)
    const [comment, setcomment] = useState(content)
    const [openReplyArea, setOpenReplyArea] = useState(false)
    const [openModel, setopenModel] = useState(false)

    //edit reply for current user
    const toggleedit = () => {
        console.log(updateArearef.current);
        setEditMode(prev => !prev)
    }

    useEffect(() => {
        if (!comment) setcomment(comment)
    }, [editMode])


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (commentArea.current && !commentArea.current.contains(event.target) && replyArearef.current && !replyArearef.current.contains(event.target)) {
                setOpenReplyArea(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    const handleReply = (e) => {
        setOpenReplyArea(prev => !prev)
    }

    const handlechange = (e) => {
        setcomment(updateArearef.current.value)
        toggleedit()
    }



    return (
        <>
            <div id={id} ref={commentArea} className={cn('bg-white shadow-sm mx-5 md:mx-0 dark:text-black text-base px-5 py-4 flex flex-col-reverse md:flex-row rounded-md gap-6 relative ', className)}>
                <div className="rounded-md gap-2 py-1.5 px-3 md:p-2.5 flex w-fit md:w-auto md:flex-col items-center bg-verylightgrey h-fit">
                    <Scorebtn score={score} />
                </div>
                <div className="w-full">
                    <div className="flex items-center justify-between">
                        <p className="flex items-center gap-3">
                            <Avatar className='w-8 h-8'>
                                <AvatarImage src={img} />
                                <AvatarFallback className='dark:text-white'>{capitalizeFirstLetter(username)}</AvatarFallback>
                            </Avatar>
                            <span className="text-darkblue font-medium flex items-center justify-center">{username}</span>
                            {/* {username === currentuser && <span className="text-white bg-modernblue w-fit flex items-center justify-center leading-5 px-2 rounded-sm">you</span>} */}
                            {username === currentUsername && <span className="rounded-md text-white bg-modernblue px-1.5 py-0.5 text-sm leading-none no-underline group-hover:no-underline">you</span>}
                            <span className="text-grayishblue tracking-tight flex items-center justify-center">{createdAt}</span>
                        </p>
                        {username !== currentUsername ? <Button className="btnstate text-modernblue hover:text-opacity-50  hover:bg-white bg-white flex gap-1.5 absolute md:static bottom-3.5 right-5 " onClick={(e) => { handleReply(e, username) }}>{!openReplyArea ? <><FaReply /> Reply</> : "Cancel"}</Button> :
                            <div className="flex gap-3 absolute md:static bottom-3.5 right-5">
                                {!editMode && <Button className="flex items-center gap-2 bg-white hover:bg-white text-softred hover:text-palered" onClick={(e) => setopenModel(true)}><FaTrash /> Delete</Button>}
                                <Button className="flex gap-2 bg-white hover:bg-white text-modernblue hover:text-opacity-50 " onClick={(e) => toggleedit()} >{!editMode && <FaPen />}{!editMode ? "Edit" : "Cancel"}</Button>
                            </div>
                        }
                    </div>
                    {/* <div className={cn("mt-2 text-grayishblue box-border", edit && 'p-4 rounded-md outline-none outline-1 border focus-within:border-0 focus-within:outline-darkblue')} > */}
                    <div className={'mt-2'} >
                        {!editMode ? <>
                            {replyingTo && <span className="text-modernblue font-medium">@{replyingTo} </span>}{comment}
                        </> : <Textarea ref={updateArearef} defaultValue={content} className="w-full resize-none focus-visible:ring-white focus:border-darkblue" placeholder="Add a comments..." />}
                    </div>
                    {editMode && <Button className="relative float-right text-white bg-modernblue hover:bg-modernblue hover:bg-opacity-50 mt-5" onClick={(e) => { handlechange(e) }} >Update</Button>}
                </div>
            </div>

            {openReplyArea && <div className="w-full">
                <ChatArea ref={replyArearef} setOpenReplyArea={setOpenReplyArea} className={"activeArea"} img={currentuserimage.png} username={currentUsername} handleaddComments={handleaddComments} replyingTo={username} />
            </div>}



            <Dialog open={openModel} onOpenChange={setopenModel}>
                <DialogContent className='max-w-xs rounded-md'>
                    <DialogHeader>
                        <DialogTitle className="text-left">Delete comment</DialogTitle>
                        <DialogDescription className="mt-2">
                            <span className="mt-4 text-left" >Are you sure you want to delete this comment? This will remove the comment and can&#39;t be undone.
                            </span>
                            <span className="flex gap-3 mt-4 justify-between">
                                <DialogClose asChild>
                                    <Button className="text-white w-full bg-darkblue hover:bg-darkblue hover:bg-opacity-50">NO,CANCEL</Button>
                                </DialogClose>
                                <Button className="text-white w-full bg-softred hover:bg-softred hover:bg-opacity-50" onClick={(e) => handledeletecomment(id)}>YES,DELETE</Button>
                            </span>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Chatui