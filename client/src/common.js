
// date of expiration in millisecs from epoch
export const getExpirationTime = (secondsLeft) => {
    return (new Date()).getTime() + secondsLeft * 1000
}