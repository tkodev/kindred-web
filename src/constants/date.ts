/** `date-fns` format string for the site's short month-and-year date display. */
const simpleDateFormat = 'MMM yyyy'
/** IANA time zone all dates are zoned to; `new Date()` is never read bare. */
const appTimeZone = 'America/Toronto'

export { appTimeZone, simpleDateFormat }
