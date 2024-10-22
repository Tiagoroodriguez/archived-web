import { Card } from '@tremor/react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import socket from '../../utils/socket';
import { useState } from 'react';

export default function AdminAnaliticas() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    socket.connect();
    socket.on('count', (count) => {
      console.log(count);
      setCount(count);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Analiticas | Administracion</title>
        <meta
          name='description'
          content='Pagina de analiticas'
        />
        <link
          rel='canonical'
          href='http://archived.com.ar/analytical'
        />
      </Helmet>
      <main className='admin-newsletter'>
        <h1>Analiticas</h1>
        <section className='w-60'>
          <Card>
            <h2 className='flex items-center'>
              <span className='relative flex h-5 w-5 mr-4'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-5 w-5 bg-green-500'></span>
              </span>
              <span className='block text-sm font-semibold'>
                {count} Online
              </span>
            </h2>
          </Card>
        </section>
      </main>
    </>
  );
}
