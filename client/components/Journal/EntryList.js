import React, { useEffect, useState } from 'react';
import Entry from './Entry';
import { searchEntries } from './EntryManager';
import { Box, Tab, Tabs, TextField, Typography, Paper } from '@mui/material';

const EntryList = ({
  moods,
  entries,
  onEditButtonClick,
  onDeleteButtonClick,
}) => {
  const [filteredEntries, setEntries] = useState([]);
  const [searchedTerm, setTerm] = useState('');
  const [moodSelected, setMoodSelected] = useState('');

  useEffect(() => {
    if (searchedTerm !== '') {
      searchEntries(searchedTerm).then((entriesData) =>
        setEntries(entriesData)
      );
    } else {
      setEntries(entries);
    }
  }, [searchedTerm, entries]);

  const filterAllEntries = (moodId) => {
    const filteredEntriesByMood = entries.filter(
      (entry) => entry.moodId === parseInt(moodId)
    );
    setEntries(filteredEntriesByMood);
    setMoodSelected(parseInt(moodId));
  };

  return (
    <Box sx={{ backgroundColor: '#F5F5F5', p: 2 }}>
      <Typography variant='h4'>Entries</Typography>
      <Tabs
        value={moodSelected}
        onChange={(event, newValue) => {
          if (newValue === '') {
            setEntries(entries);
          } else {
            filterAllEntries(newValue);
          }
          setMoodSelected(newValue);
        }}
        variant='scrollable'
        scrollButtons='auto'
        sx={{ my: 1 }}
      >
        <Tab label='All' value='' />
        {moods.map((mood) => (
          <Tab key={mood.id} label={mood.label} value={mood.id} />
        ))}
      </Tabs>
      <TextField
        label='Search'
        variant='outlined'
        fullWidth
        margin='normal'
        onKeyUp={(event) => {
          const searchTerm = event.target.value;
          setTerm(searchTerm);
        }}
      />
      {/*
              Pseudo Code
              .filter(happyEntries => happyEntries.mood.label === "Happy")
          */}
      {filteredEntries.map((entry) => (
        <Box key={entry.id} sx={{ mb: 1 }}>
          <Entry
            entry={entry}
            mood={moods.find((m) => m.id === entry.moodId)}
            onEditButtonClick={onEditButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
          />
        </Box>
      ))}
    </Box>
  );
};

export default EntryList;
