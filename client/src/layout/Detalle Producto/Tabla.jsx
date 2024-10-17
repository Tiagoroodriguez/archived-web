import { useState, useEffect } from 'react';

export default function Tabla({ producto, oversize, boxy, buzo }) {
  const [medidas, setMedidas] = useState(null);

  useEffect(() => {
    if (producto) {
      if (oversize) {
        setMedidas(producto.coleccion.oversize_medidas[0]);
      } else if (boxy) {
        setMedidas(producto.coleccion.boxy_medidas[0]);
      } else if (buzo) {
        setMedidas(producto.coleccion.buzo_medidas[0]);
      } else {
        setMedidas(null);
      }
    }
  }, [producto, oversize, boxy]);

  if (!producto) return null;

  return (
    <>
      {medidas && (
        <div className='p-2'>
          <table className='w-full p-[5px]'>
            <thead className='border bg-[#2e373e13]'>
              <tr>
                <th className='p-1'>Talla</th>
                <th className='p-1'>Largo (cm)</th>
                <th className='p-1'>Ancho (cm)</th>
              </tr>
            </thead>
            <tbody className='border w-full text-center'>
              {Object.keys(medidas).map((key) => {
                if (key.startsWith('largo_')) {
                  const talla = key.split('_')[1];
                  return (
                    <tr key={talla}>
                      <td>{talla.toUpperCase()}</td>
                      <td>{medidas[`largo_${talla}`]}</td>
                      <td>{medidas[`ancho_${talla}`]}</td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
          <p className='opacity-[60%] pt-2 pb-2 text-sm'>
            Las medidas pueden variar ligeramente
          </p>
        </div>
      )}
    </>
  );
}
