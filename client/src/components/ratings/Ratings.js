import React, { useState, useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import './ratings.css';
import { Input, Stack, Button, ButtonGroup } from '@chakra-ui/react';
import { Context } from '../../context/Context';
import axios from 'axios';

const Ratings = ({id}) => {
  const { user } = useContext(Context);
  const [stars, setStars] = useState(null);
  const [hoverStar, setHoverStar] = useState(null);
  const [ratingTitle, setRatingTitle] = useState('');
  const [ratingBody, setRatingBody] = useState('');
 console.log('id', {id});
  const submitReview = async (e) => {
    e.preventDefault();
    const newReview = {
      username: user.username,
      ratingTitle,
      ratingBody,
      stars,
      id
    }
    console.log(newReview);

    try {
      await axios.post('/reviews', newReview);
      
    } catch (error) {}

  };

  console.log(stars);

  return (
    <div>
      <form onSubmit={submitReview}>
        <label>
          <p>How many stars would you give this course? </p>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

            return (
              <label>
                <input
                  type='radio'
                  name='rating'
                  value={ratingValue}
                  onClick={() => setStars(ratingValue)}
                />
                <FaStar
                  className='star'
                  size={20}
                  onMouseEnter={() => setHoverStar(ratingValue)}
                  onMouseLeave={() => setHoverStar(null)}
                  color={
                    ratingValue <= (hoverStar || stars) ? '#ffc107' : '#e4e5e9'
                  }
                />
              </label>
            );
          })}
        </label>

        <Stack>
          <label>
            Rating Title
            <Input
              placeholder='Title'
              size='md'
              onChange={(e) => setRatingTitle(e.target.value)}
            />
          </label>
          <label>
            Description
            <Input
              placeholder='Rating'
              size='md'
              onChange={(e) => setRatingBody(e.target.value)}
            />
          </label>
          <Button className='submit' type='submit' colorScheme='teal' variant='solid'>
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default Ratings;
