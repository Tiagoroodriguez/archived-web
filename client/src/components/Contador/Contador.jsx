import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Contador.css';

export default function Contador({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1, ease: 'easeInOut' }}
      className='hero-contador contador'
    >
      <div className='contador-container'>
        <span className='contador-tiempo'>{timeLeft.days}</span>
        <span className='contador-texto'>Días</span>
      </div>
      <div className='contador-separador'>:</div>
      <div className='contador-container'>
        <span className='contador-tiempo'>{timeLeft.hours}</span>
        <span className='contador-texto'>Horas</span>
      </div>
      <div className='contador-separador'>:</div>
      <div className='contador-container'>
        <span className='contador-tiempo'>{timeLeft.minutes}</span>
        <span className='contador-texto'>Minutos</span>
      </div>
      <div className='contador-separador'>:</div>
      <div className='contador-container'>
        <span className='contador-tiempo'>{timeLeft.seconds}</span>
        <span className='contador-texto'>Segundos</span>
      </div>
    </motion.div>
  );
}
