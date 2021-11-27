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

export const toBinary = (str: string) => {
  const codeUnits = new Uint16Array(str.length);

  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = str.charCodeAt(i);
  }

  const charCodes = new Uint8Array(codeUnits.buffer);
  let result = '';

  for (let i = 0; i < charCodes.byteLength; i++) {
    result += String.fromCharCode(charCodes[i]);
  }

  return result;
};
