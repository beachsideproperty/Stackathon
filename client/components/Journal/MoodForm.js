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
    setShowTooltip(true);
  };

  useEffect(() => {
    if (showTooltip) {
      const timeoutId = setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [showTooltip]);

  useEffect(() => {
    if (!showTooltip) {
      setShowTooltip(false);
    }
  }, [showTooltip]);

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <FormLabel htmlFor='mood'>Mood:</FormLabel>
            <Select id='mood' value={selectedMood} onChange={handleMoodChange}>
              <MenuItem value='Elated'>Elated</MenuItem>
              <MenuItem value='Happy'> Happy</MenuItem>
              <MenuItem value='Content'>Content</MenuItem>
              <MenuItem value='So-so'>So-so</MenuItem>
              <MenuItem value='Annoyed'>Annoyed</MenuItem>
              <MenuItem value='Unhappy'>Unhappy</MenuItem>
              <MenuItem value='Despondent'>Despondent</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Tooltip
            title='Thanks for sharing'
            placement='bottom'
            open={showTooltip}
            onClose={() => setShowTooltip(false)}
          >
            <span>
              <Button
                variant='outlined'
                onClick={handleSubmit}
                disabled={!selectedMood}
              >
                Submit
              </Button>
            </span>
          </Tooltip>
        </Box>
      </form>
    </Box>
  );
};

export default MoodForm;
