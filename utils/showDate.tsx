const showDate = (time: any) => {
    let date = new Date(`${time}`).getTime();
    let now = new Date().getTime();
    const difference = now - date;
    const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));
    return daysAgo;
}

export default showDate;