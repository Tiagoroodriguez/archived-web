import { useEffect, useState } from 'react';
import { Boton } from '../Boton/Boton';
import Input from '../Input/Input';
import { LogoTexto } from '../LogoTexto/LogoTexto';
import './Newsletter.css';
import {
  checkSubscriptionRequest,
  subscribeRequest,
} from '../../api/subscriber';
import { toast } from 'sonner';

export default function Newsletter() {
  const [newsletterVisible, setNewsletterVisible] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = async () => {
    if (!email) {
      toast.error('Por favor, complete el campo');
      return;
    }
    try {
      await subscribeRequest({ email });
      localStorage.setItem('isSubscribed', 'true');
      setNewsletterVisible(false);
      toast.success('Suscripto correctamente');
    } catch (error) {
      console.error('Error subscribing', error);

      if (error.response.status === 400) {
        toast.error('Email ya suscripto');
      }
    }
  };

  useEffect(() => {
    const checkSubscription = async () => {
      const isSubscribed = localStorage.getItem('isSubscribed');
      if (isSubscribed === 'true') {
        return;
      }

      try {
        const response = await checkSubscriptionRequest(email);

        if (!response.data.subscribed) {
          const lastShown = localStorage.getItem('newsletterLastShown');
          const now = new Date().getTime();
          const fiveHours = 5 * 60 * 60 * 1000; // 5 horas en milisegundos ->

          if (!lastShown || now - lastShown > fiveHours) {
            setNewsletterVisible(true);
            localStorage.setItem('newsletterLastShown', now.toString());
          }
        }
      } catch (error) {
        console.error('Error checking subscription', error);
      }
    };

    checkSubscription();
  }, [email]);

  const handdleClose = () => {
    setNewsletterVisible(false);
  };

  return (
    newsletterVisible && (
      <div className='newsletter-overlay'>
        <div className='newsletter-container'>
          <button
            className='newsletter-exit-button'
            onClick={handdleClose}
            aria-label='Cerrar newsletter'
          >
            <i className='bi bi-x-lg' />
          </button>
          <div className='newsletter-data'>
            <header>
              <LogoTexto />
            </header>
            <section>
              <h2>
                ¡Suscríbete y obtene un 10% de descuento en tu proxima compra!
              </h2>
              <p>
                Se el primero en enterarte de nuestros proximos lanzamientos
              </p>
              <div className='newsletter-inputs'>
                <Input
                  type='email'
                  label='Correo electrónico'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Boton
                textBoton='Suscribirse'
                onClick={handleSubscribe}
              />
            </section>
          </div>
          <picture className='newsletter-imagen'>
            <img src='/images/newsletter-imagen.webp' />
          </picture>
        </div>
      </div>
    )
  );
}
