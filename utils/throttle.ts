export default function throttle(func: Function, wait: number) {
  let timer: null | NodeJS.Timeout = null;

  return function callback(...args: any) {
    if (timer === null) {
      timer = setTimeout(() => {
        func.apply(callback, args);
        timer = null;
      }, wait);
    }
  };
}
