import express from 'express';
import Subscriber from '../models/subscriber.model.js';

const router = express.Router();

router.post('/subscribe', async (req, res) => {
  const { email, nombre } = req.body;

  try {
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    subscriber = new Subscriber({ email, nombre });
    await subscriber.save();
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Error subscribing user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/subscribers', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (error) {
    console.error('Error getting subscribers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/check-subscription', async (req, res) => {
  const { email } = req.query;
  const user = await Subscriber.findOne({ email });
  res.json({ subscribed: user ? user.subscribed : false });
});

router.delete('/unsubscribe', async (req, res) => {
  const { email } = req.body;

  try {
    let subscriber = await Subscriber.findOneAndDelete({ email });

    if (!subscriber)
      return res.status(404).json({ message: 'subscriber not found' });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: 'subscriber no encontrado' });
  }
});

export default router;
