'use client'

import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

const Comment = ({ comment, addReply }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [likes, setLikes] = useState(comment.likes || 0);
  const [dislikes, setDislikes] = useState(comment.dislikes || 0);
  const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(new Date(comment.timestamp)));

  // Update the time ago every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeAgo(formatDistanceToNow(new Date(comment.timestamp)));
      console.log("first")
    }, 60000); // Update every 60,000ms (1 minute)

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [comment.timestamp]); // Run only if the timestamp changes

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = () => {
    if (replyText) {
      addReply(comment.id, replyText);
      setReplyText("");
      setIsReplying(false);
    }
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  return (
    <div className={`ml-${comment.depth * 5} pb-4 bg-gray-700 text-white`}>
      {/* Comment Content */}
      <div className="flex items-start space-x-3">
        <img
          src={comment.userAvatar}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold ">{comment.username}</span>
            <span className="text-sm text-gray-200">{timeAgo}</span> {/* Display the updated time ago */}
          </div>
          <p className="mt-1 text-white/80">{comment.text}</p>
          
          {/* Like/Dislike Section */}
          <div className="flex items-center space-x-4 mt-2">
            <button
              className="flex items-center space-x-1 "
              onClick={handleLike}
            >
              <span className="text-lg">👍</span>
              <span>{likes}</span>
            </button>
            <button
              className="flex items-center space-x-1"
              onClick={handleDislike}
            >
              <span className="text-lg">👎</span>
              <span>{dislikes}</span>
            </button>
            <button
              className="text-white/80 hover:text-blue-500"
              onClick={() => setIsReplying(!isReplying)}
            >
              {isReplying ? "Cancel Reply" : "Reply"}
            </button>
          </div>
          
          {/* Reply Input */}
          {isReplying && (
            <div className="mt-2">
              <textarea
                value={replyText}
                onChange={handleReplyChange}
                placeholder="Write a reply..."
                className="w-full p-2 border text-black  border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleReplySubmit}
                className="mt-2 px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Submit Reply
              </button>
            </div>
          )}

          {/* Render replies recursively */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 space-y-4">
              {comment.replies.map((reply) => (
                <Comment
                  key={reply.id}
                  comment={{ ...reply, depth: comment.depth + 1 }} // Increase depth for nesting
                  addReply={addReply} // Pass down the function to handle adding a reply
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
