'use client'

import React, { useState } from 'react';
import Comment from './comment'; // Importing the Comment component

// Add this helper function after imports
const getRandomAvatar = () => {
  const gender = Math.random() < 0.5 ? 'men' : 'women';
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  return `https://randomuser.me/api/portraits/${gender}/${randomNumber}.jpg`;
};

const getRandomUsername = () => {
  const usernames = ["john_doe", "jane_doe", "bob_smith", "alice_jones", "charlie_brown"];
  return usernames[Math.floor(Math.random() * usernames.length)];
};

const commentsData = [
  {
    id: 1,
    username: "john_doe",
    userAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    text: "This is a comment",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    likes: 5,
    dislikes: 2,
    replies: [ ],
  },
  {
    id: 4,
    username: "bob_smith",
    userAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
    text: "This is another comment",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 2,
    dislikes: 0,
    replies: [],
  },
];

export default function Home() {
  const [comments, setComments] = useState(commentsData);

  // Add a new reply to a comment, including for nested replies
  const addReply = (commentId, replyText) => {
    // Recursive function to add the reply
    const addReplyRecursive = (comments, id, text) => {
      return comments.map((comment) => {
        // If the comment matches the id, add a reply to it
        if (comment.id === id) {
          const newReply = {
            id: Date.now(), // Generate a unique ID for the new reply
            username: getRandomUsername(), // Example username for the reply
            userAvatar: getRandomAvatar(), // Example avatar
            text: text,
            timestamp: new Date().toISOString(), // Add current time
            likes: 0,
            dislikes: 0,
            replies: [], // New reply doesn't have nested replies yet
          };
          return {
            ...comment,
            replies: [...comment.replies, newReply], // Add new reply to this comment's replies
          };
        }

        // If the comment has replies, recursively check them
        if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: addReplyRecursive(comment.replies, id, text), // Recursively add reply to sub-comments
          };
        }

        return comment; // If no match, return the comment as is
      });
    };

    const updatedComments = addReplyRecursive(comments, commentId, replyText);
    setComments(updatedComments); // Update the state with the modified comment tree
  };

  return (
   <div className='flex flex-col items-center justify-center'>
     <div className="max-w-4xl mx-auto sm:min-w-[500px] mt-8 bg-gray-700 p-6 rounded-lg text-white">
      <h1 className="text-2xl font-semibold mb-6 ">Comments Section</h1>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={{ ...comment, depth: 0 }} // Initial depth is 0
          addReply={addReply} // Pass down the function to handle adding a reply
        />
      ))}
    </div>
   </div>
  );
}
