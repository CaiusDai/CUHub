const format_date = (date) => {
    date = new Date(date)
    return `${date.toDateString()},${date.toLocaleTimeString()}`
}

const timeoutPromise = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

module.exports = {
    format_date,
    timeoutPromise,
}
