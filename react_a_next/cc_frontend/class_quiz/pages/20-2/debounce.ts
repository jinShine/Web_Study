export function debounce<T extends (...args: any) => any>(
  callback: T,
  timeout: number = 500
): (...args: any) => any {
  let timer;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
}
