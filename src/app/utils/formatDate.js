function formatDate(dateString) {
  if (!dateString) return ''; // Возвращаем пустую строку, если даты нет

  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0, поэтому добавляем 1
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  } catch (error) {
    console.error("Ошибка форматирования даты:", dateString, error);
    return dateString; 
  }
}

export default formatDate;