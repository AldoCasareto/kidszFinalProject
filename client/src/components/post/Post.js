import React from 'react';
import './post.css';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  const { title, description, photo, categories, _id, price, duration } = post;
  const publicFolder = 'http://localhost:9000/images/';
  return (
    <div className='post'>
      {photo && <img className='postImg' src={publicFolder + photo} alt='' />}
      <div className='postInfo'>
        <div className='postCats'>
          {categories.map((category) => (
            <span className='postCat'>{category.name}</span>
          ))}
        </div>
        <Link to={`/post/${_id}`} className='link'>
          <span className='postTitle'>{title}</span>
        </Link>

        <hr />
        {/* <span className='postDate'>{format(createdAt)}</span> */}
      </div>
      <p className='postDesc'>{description}</p>
      <p>Cost: USD {price}</p>
      <p>Duration: {duration} min</p>
  
    </div>
  );
};

export default Post;
