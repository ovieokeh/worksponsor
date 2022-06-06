/**
 * This function handles high trigger rate of events,
 * by keeping the trigger rate at 0 for a period of time.
 * @function debounce
 * https://codeburst.io/throttling-and-debouncing-in-javascript-646d076d0a44
 *
 * @param {function} func
 * @param {number} delay
 */
export default function debounce(func: Function, delay: number) {
  let inDebounce: null | NodeJS.Timeout = null;

  return function debounced(...args: any) {
    if (inDebounce !== null) {
      const context = debounce;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    }
  };
}
