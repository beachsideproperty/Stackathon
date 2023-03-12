import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';

const MoodForm = () => {
  const { date } = useParams();
  const user = useSelector((state) => state.auth.user);
  const [mood, setMood] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = date.replace(/-/g, '/');
    window.location.href = `/dashboard/${user.uid}/${formattedDate}/${mood}`;
  };

  return (
    <Box>
      <h2>Mood for {date}</h2>
      <form onSubmit={handleSubmit}>
        <Box>
          <label htmlFor='mood'>Mood:</label>
          <select
            id='mood'
            name='mood'
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value='happy'>Happy</option>
            <option value='sad'>Sad</option>
            <option value='angry'>Angry</option>
          </select>
        </Box>
        <button type='submit'>Submit</button>
      </form>
    </Box>
  );
};

export default MoodForm;
