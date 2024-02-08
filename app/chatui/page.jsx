"use client"
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Chatui from '@/components/chatui/chatui';
import json from "@/components/chatui/data.json"
import ChatArea from '@/components/chatui/replyArea';


export default function Page() {
    const [data, setData] = useState(json)
    const [conversations, setConversations] = useState([]);
    const commentSectionRef = useRef(null)

    useEffect(() => {
        setConversations(data.comments)
    }, [data])

    //remove active chatarea parent
    function removeActiveReply(className) {
        const elementsWithClass = document.getElementsByClassName(className);

        for (const element of elementsWithClass) {
            const parentElement = element.parentElement;
            if (parentElement) {
                parentElement.remove();
            }
        }

    }

    const handleaddComments = (comment) => {
        //skip submit btn if comment is empty
        if (comment.current.value.trim().length == 0) return false

        const currentComment = {
            "id": uuidv4(),
            "content": comment.current.value,
            "createdAt": "few mins ago",
            "score": Math.floor(Math.random() * 20),
            "user": {
                "image": {
                    "png": "./assets/avatars/image-juliusomo.png",
                    "webp": "./assets/avatars/image-juliusomo.webp"
                },
                "username": data.currentUser.username
            },
            "replies": []
        }

        //reset the textarea
        comment.current.value = null

        setData((prevData) => {
            const updatedData = {
                ...prevData,
                comments: [...prevData.comments, currentComment],
            };
            return updatedData;
        });

        // Use a setTimeout to ensure the state update is complete before scrolling
        setTimeout(() => {
            commentSectionRef.current.scrollTop = commentSectionRef.current.scrollHeight;
        }, 100);
    }

    const handleDeleteComment = (commentID, arraycomments) => {
        arraycomments = arraycomments || conversations;

        for (let i = 0; i < arraycomments.length; i++) {
            if (arraycomments[i].id === commentID) {
                arraycomments.splice(i, 1);
                setData((data) => ({
                    ...data,
                    comments: [...conversations],
                }));
                return true;
            }

            if (arraycomments[i].replies && arraycomments[i].replies.length > 0) {
                const replyDeleted = handleDeleteComment(commentID, arraycomments[i].replies);

                if (replyDeleted) {
                    return true;
                }
            }
        }

        return false;
    };


    const handleReplyComments = (comment, replyingTo = null) => {
        //skip submit btn if comment is empty
        if (comment.current.value.trim().length === 0) return false;

        const currentComment = {
            "id": uuidv4(),
            "content": comment.current.value,
            "createdAt": "few mins ago",
            "score": Math.floor(Math.random() * 20),
            "replyingTo": null,
            "user": {
                "image": {
                    "png": "./assets/avatars/image-juliusomo.png",
                    "webp": "./assets/avatars/image-juliusomo.webp"
                },
                "username": data.currentUser.username
            },
            "replies": []
        }

        // Find the comment in conversations array with matching replyingTo
        const targetComment = conversations.find(c => c.user.username === replyingTo);

        console.log('datasasasa', targetComment);

        if (targetComment) {
            // Add the currentComment to replies array of the target comment
            targetComment.replies = [...targetComment.replies, currentComment];
        } else {
            conversations[1].replies = [currentComment, ...conversations[1].replies]
        }

        // Update the state with the modified conversations array
        setData(prevData => ({
            ...prevData,
            comments: [...prevData.comments]
        }));

        removeActiveReply('activeArea')
        // setData((data) => ({
        //     ...data,
        //     comments: [...data.comments, currentComment],
        // }));
    }

    return (
        <>
            <div className='md:max-w-3xl m-auto h-screen relative flex flex-col gap-5 py-10'>
                <div ref={commentSectionRef} className='flex flex-col gap-4 overflow-auto h-80% md:h-5/6 '>
                    {conversations.length > 0 &&
                        conversations.map((conversation) => (
                            <div key={conversation.id} className='w-full flex flex-col gap-3' >
                                <Chatui
                                    id={conversation.id}
                                    handledeletecomment={handleDeleteComment}
                                    handleaddComments={handleReplyComments}
                                    removeActiveReply={removeActiveReply}
                                    currentuser={data.currentUser}
                                    score={conversation.score}
                                    createdAt={conversation.createdAt}
                                    content={conversation.content}
                                    img={conversation?.user?.image.png}
                                    username={conversation?.user?.username} />
                                {conversation.replies.length > 0 && <div className='relative'>
                                    <div className='float-end flex flex-col justify-center items-end gap-3 px-5 md:px-0 md:pl-12 mt-5 w-13/12 border-l-2' >
                                        {conversation.replies.map((replie) => (
                                            <Chatui
                                                key={replie.id}
                                                className={"w-full md:w-12/12 mx-0"}
                                                handleaddComments={handleReplyComments}
                                                handledeletecomment={handleDeleteComment}
                                                removeActiveReply={removeActiveReply}
                                                id={replie.id}
                                                replyingTo={replie.replyingTo}
                                                score={replie.score}
                                                currentuser={data.currentUser}
                                                createdAt={replie.createdAt}
                                                content={replie.content}
                                                img={replie.user.image.png}
                                                username={replie.user.username} />
                                        ))}
                                    </div>
                                </div>
                                }
                            </div>
                        ))}
                </div>
                <ChatArea img={data.currentUser.image.png} username={data.currentUser.username} handleaddComments={handleaddComments} reply={false} />
            </div>
        </>
    );
}
