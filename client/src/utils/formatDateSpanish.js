export const formatDateSpanish = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  if (month === '01') {
    return `${day} de Enero de ${year}`;
  }
  if (month === '02') {
    return `${day} de Febrero de ${year}`;
  }
  if (month === '03') {
    return `${day} de Marzo de ${year}`;
  }
  if (month === '04') {
    return `${day} de Abril de ${year}`;
  }
  if (month === '05') {
    return `${day} de Mayo de ${year}`;
  }
  if (month === '06') {
    return `${day} de Junio de ${year}`;
  }
  if (month === '07') {
    return `${day} de Julio de ${year}`;
  }
  if (month === '08') {
    return `${day} de Agosto de ${year}`;
  }
  if (month === '09') {
    return `${day} de Septiembre de ${year}`;
  }
  if (month === '10') {
    return `${day} de Octubre de ${year}`;
  }
  if (month === '11') {
    return `${day} de Noviembre de ${year}`;
  }
  if (month === '12') {
    return `${day} de Diciembre de ${year}`;
  }
};
