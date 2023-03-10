import React, { useState, useEffect } from 'react';
import EntryForm from './EntryForm';
import EntryList from './EntryList';
import {
  addEntry,
  deleteEntry,
  getEntries,
  getEntryById,
  updateEntry,
} from './EntryManager';
import getMoods from './Moods';
import { Container, Grid } from '@mui/material';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [moods, setMoods] = useState([]);
  const [entry, setEntry] = useState({});

  useEffect(() => {
    getAllEntries();
    getMoods().then((moodsData) => setMoods(moodsData));
  }, []);

  const getAllEntries = () => {
    getEntries().then((entriesData) => setEntries(entriesData));
  };

  const onEditButtonClick = (entryId) => {
    getEntryById(entryId)
      .then((entryData) => setEntry(entryData))
      .then(() => console.log(entry));
  };

  const onDeleteButtonClick = (entryId) => {
    deleteEntry(entryId).then(getAllEntries);
  };

  const onFormSubmit = (entryData) => {
    console.log('submit', entryData);
    if (entryData.id) {
      updateEntry(entryData).then(getAllEntries);
    } else {
      addEntry(entryData).then(getAllEntries);
    }
    setEntry({
      concept: '',
      entry: '',
      moodId: 0,
    });
  };

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <EntryForm entry={entry} moods={moods} onFormSubmit={onFormSubmit} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <EntryList
            entries={entries}
            moods={moods}
            onEditButtonClick={onEditButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Journal;
