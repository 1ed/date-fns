import toDate from '../toDate/index.js'

/**
 * @name roundToNearestMinutes
 * @category Minute Helpers
 * @summary Rounds the given date to the nearest minute
 *
 * @description
 * Rounds the given date to the nearest minute (or number of minutes).
 * Rounds up when the given date is exactly between the nearest round minutes.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param date - The date to round
 * @param options - The options object
 * @returns The new date rounded to the closest minute
 * @throws {RangeError} `options.nearestTo` must be between 1 and 30
 *
 * @example
 * // Round 10 July 2014 12:12:34 to nearest minute:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34))
 * //=> Thu Jul 10 2014 12:13:00
 *
 * @example
 * // Round 10 July 2014 12:07:30 to nearest quarter hour:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { nearestTo: 15 })
 * // rounds up because given date is exactly between 12:00:00 and 12:15:00
 * //=> Thu Jul 10 2014 12:15:00
 */
export default function roundToNearestMinutes(
  dirtyDate: Date | number,
  options: { nearestTo?: number } = {}
) {
  const nearestTo = options.nearestTo ?? 1
  if (nearestTo < 1 || nearestTo > 30)
    throw new RangeError('`options.nearestTo` must be between 1 and 30')

  const date = toDate(dirtyDate)
  const seconds = date.getSeconds() // relevant if nearestTo is 1, which is the default case
  const minutes = date.getMinutes() + seconds / 60
  const roundedMinutes = Math.floor(minutes / nearestTo) * nearestTo
  const remainderMinutes = minutes % nearestTo
  const addedMinutes = Math.round(remainderMinutes / nearestTo) * nearestTo

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    roundedMinutes + addedMinutes
  )
}
