export function formatDateToSpanish(dateString) {
  // Crear un objeto de fecha a partir de la cadena de fecha
  const date = new Date(dateString);

  // Opciones de formato para la fecha
  const options = { day: '2-digit', month: 'short', year: 'numeric' };

  // Formatear la fecha usando el método toLocaleDateString
  const formattedDate = date.toLocaleDateString('es-ES', options);

  // Crear un mapa de los nombres abreviados de los meses en español
  const monthMap = {
    'ene.': 'ene.',
    'feb.': 'feb.',
    'mar.': 'mar.',
    'abr.': 'abr.',
    'may.': 'may.',
    'jun.': 'jun.',
    'jul.': 'jul.',
    'ago.': 'ago.',
    'sept.': 'sept.',
    'oct.': 'oct.',
    'nov.': 'nov.',
    'dic.': 'dic.',
  };

  // Descomponer la fecha formateada
  const parts = formattedDate.match(/(\d+)\sde\s(\w+)\sde\s(\d+)/);
  if (!parts) {
    throw new Error('Fecha formateada no coincide con el patrón esperado.');
  }

  const day = parts[1];
  const month = monthMap[parts[2]];
  const year = parts[3];

  // Devolver la fecha en el formato deseado
  return `${day} de ${month} de ${year}`;
}
