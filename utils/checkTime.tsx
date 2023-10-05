export default function formatDateTime(backendDateTime: string): string {
    // Parse the backendDateTime string into a Date object
    const dateObject = new Date(backendDateTime);

    // Extract date components
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Months are 0-indexed, so add 1
    const day = dateObject.getDate();

    // Extract time components
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    // Format the date and time components with leading zeros if necessary
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    // Combine the formatted date and time
    const formattedDateTime = `${formattedDate} ${formattedTime}`;

    return formattedDateTime;
}
