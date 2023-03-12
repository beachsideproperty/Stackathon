import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Tooltip, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { fetchAllMoods, createMood } from '../../store/slices/moods';

const MoodForm = (props) => {
  const { formattedDate } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [selectedMood, setSelectedMood] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    dispatch(fetchAllMoods(formattedDate));
  }, [dispatch, formattedDate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setShowTooltip(true);
    handleSaveMood();
  };

  const handleMoodChange = (event) => {
    setSelectedMood(event.target.value);
  };

  const handleSaveMood = () => {
    dispatch(
      createMood({
        date: formattedDate,
        mood: selectedMood,
        userId: user.id,
      })
    );
  };

  useEffect(() => {
    if (selectedMood && submitted) {
      setSubmitted(false);
    }
  }, [selectedMood, submitted]);

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <FormLabel htmlFor='mood'>Mood:</FormLabel>
            <Select id='mood' value={selectedMood} onChange={handleMoodChange}>
              <MenuItem value='elated'>Elated</MenuItem>
              <MenuItem value='happy'> Happy</MenuItem>
              <MenuItem value='content'>Content</MenuItem>
              <MenuItem value='so-so'>So-so</MenuItem>
              <MenuItem value='frustrated'>Annoyed</MenuItem>
              <MenuItem value='unhappy'>Unhappy</MenuItem>
              <MenuItem value='despondent'>Despondent</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button
            variant='outlined'
            onClick={handleSaveMood}
            disabled={!selectedMood}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default MoodForm;
