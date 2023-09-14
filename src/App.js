import React, { useState } from 'react';
import './styles.css';
import likeIcon from './images/like.svg';
import unlikeIcon from './images/unlike.svg';
import sendIcon from './images/send.svg';
const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: 'Maria',
      comment: 'I was very glad to have you after such a long time. Can you plan a meetup? Maybe this weekend?',
      liked: false,
      reply: '',
    },
    {
      id: 2,
      name: 'Alex Benjamin',
      comment: 'Home sweet home! I’m glad you are back. It’s been two years and I miss the football matches we had together. A lot has changed since you left. Let’s meet at the ground tomorrow evening?',
      liked: false,
      reply: '',
    },
    {
      id: 3,
      name: 'Tania',
      comment: 'Hey bud, welcome back home. It’s been so long to see you back again. Would love to hear your traveling stories. Your place or mine?',
      liked: false,
      reply: '',
    },
    {
      id: 4,
      name: 'John Doe',
      comment: 'Thank you all',
      liked: false,
      reply: '',
    },
  ]);

  const handleLike = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? { ...comment, liked: !comment.liked } : comment
      )
    );
  };

  const handleReply = (commentId) => {
    const replyText = 'Old rivalry! Consider me in ;-)';
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? { ...comment, reply: replyText } : comment
      )
    );
  };

  const handleRemoveReply = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? { ...comment, reply: '' } : comment
      )
    );
  };

  const handleRemoveComment = (commentId) => {
    setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    const newComment = {
      id: comments.length + 1,
      name: 'John Doe',
      comment: e.target.comment.value,
      liked: false,
      reply: '',
    };
    setComments((prevComments) => [...prevComments, newComment]);
    e.target.comment.value = '';
  };

  return (
    <div className="comment-section">
      <div className="comments">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <img src={`user${comment.id}.png`} alt={comment.name} className="user-avatar" />
              <h3>{comment.name}</h3>
              {comment.name === 'John Doe' && <span className="highlight">ME</span>}
            </div>
            <p className="comment-text">{comment.comment}</p>
            <div className="comment-actions">
              <button className={`like-button ${comment.liked ? 'liked' : ''}`} onClick={() => handleLike(comment.id)}>
                <img src={comment.liked ? unlikeIcon : likeIcon} alt="Like" />
              </button>
              {comment.name === 'Alex Benjamin' && (
                <button className="reply-button" onClick={() => handleReply(comment.id)}>
                  Reply
                </button>
              )}
              {comment.reply && (
                <div className="reply">
                  <div className="comment-header">
                    <img src="user4.png" alt="John Doe" className="user-avatar" />
                    <h3>John Doe</h3>
                  </div>
                  <p className="reply-text">{comment.reply}</p>
                  <button className="remove-reply" onClick={() => handleRemoveReply(comment.id)}>
                    Remove
                  </button>
                </div>
              )}
              {comment.name === 'John Doe' && (
                <button className="remove-comment" onClick={() => handleRemoveComment(comment.id)}>
                  Remove
                </button>
              )}
              {comment.name === 'Maria' && <span className="non-clickable-text">Reply</span>}
              {comment.name === 'Tania' && <span className="non-clickable-text">Reply</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="add-comment">
        <form onSubmit={handleAddComment}>
          <input type="text" name="comment"className="comment-input" placeholder="Add a comment..." required />
          <button type="submit" className="add-comment-button">
  <img src={sendIcon} alt="Send" className="send-icon" />
</button>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;