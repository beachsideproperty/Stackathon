import React, { useState, useEffect } from 'react';
import {
  TextField,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Paper,
} from '@mui/material';

const EntryForm = ({ entry, moods, onFormSubmit }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedEntry, setUpdatedEntry] = useState(entry);

  useEffect(() => {
    setUpdatedEntry(entry);
    if ('id' in entry) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [entry]);

  const handleControlledInputChange = (event) => {
    const newEntry = Object.assign({}, updatedEntry);
    newEntry[event.target.name] = event.target.value;
    setUpdatedEntry(newEntry);
  };

  const constructNewEntry = () => {
    const copyEntry = { ...updatedEntry };
    copyEntry.moodId = parseInt(copyEntry.moodId);
    if (!copyEntry.date) {
      copyEntry.date = Date(Date.now()).toLocaleString('en-us').split('GMT')[0];
    }
    onFormSubmit(copyEntry);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant='h6'>
        {editMode ? 'Update Entry' : 'Create Entry'}
      </Typography>
      <FormControl sx={{ width: '100%', mt: 2 }}>
        <TextField
          id='concept'
          name='concept'
          label='Concept'
          autoFocus
          value={updatedEntry.concept}
          onChange={handleControlledInputChange}
        />
      </FormControl>
      <FormControl sx={{ width: '100%', mt: 2 }}>
        <TextField
          id='entry'
          name='entry'
          label='Entry'
          autoFocus
          value={updatedEntry.entry}
          onChange={handleControlledInputChange}
          minRows={3}
          maxRows={10}
        />
      </FormControl>
      <FormControl sx={{ width: '100%', mt: 2 }}>
        <InputLabel id='moodId-label'>Mood</InputLabel>
        <Select
          labelId='moodId-label'
          id='moodId'
          name='moodId'
          value={updatedEntry.moodId}
          onChange={handleControlledInputChange}
        >
          <MenuItem value={0}>Select a mood</MenuItem>
          {moods.map((m) => (
            <MenuItem key={m.id} value={m.id}>
              {m.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant='contained'
        color='primary'
        sx={{ mt: 2 }}
        onClick={(evt) => {
          evt.preventDefault();
          constructNewEntry();
        }}
      >
        {editMode ? 'Update' : 'Save'}
      </Button>
    </Paper>
  );
};

export default EntryForm;
