export const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false 
    };

    const formatter = new Intl.DateTimeFormat('en-GB', options); // 'en-GB' is an example locale
    const formattedDate = formatter.format(date);

    const [datePart] = formattedDate.split(', ');

    const [day, month, year] = datePart.split(' ');
    const formattedDateString = `${day} ${month} ${year}`;

    return formattedDateString;
}