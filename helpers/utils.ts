export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  timeout = 300,
) => {
  let timer: NodeJS.Timeout;

  return (...args: Parameters<typeof func>) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};
