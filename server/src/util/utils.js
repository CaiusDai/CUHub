const format_date = (date) => {
    date = new Date(date)
    return `${date.toDateString()},${date.toLocaleTimeString()}`
}

module.exports = {
    format_date,
}
