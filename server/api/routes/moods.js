const router = require('express').Router();
const {
  models: { Mood },
} = require('../../db');
const { requireToken } = require('../middleware');

// GET /api/moods/
router.get('/', requireToken, async (req, res, next) => {
  try {
    const moods = await Mood.findAll({});
    res.send(moods);
  } catch (err) {
    next(err);
  }
});

// POST /api/moods
router.post('/', requireToken, async (req, res, next) => {
  try {
    const { mood, date, userId } = req.body;

    const [newMood, created] = await Mood.findOrCreate({
      where: {
        date,
        userId,
      },
      defaults: {
        mood,
        date,
        userId,
      },
    });

    if (!created) {
      newMood = await newMood.update({ mood });
    }

    res.status(201).json({ mood: newMood });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
