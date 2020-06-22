export function isFunction(arg: any) {
  return typeof arg === 'function';
}

export function isString(arg: any): arg is string {
  return typeof arg === 'string';
}

export function compareKeys(keysOrFuncs: any[]) {
  return ( prevState, currState ) => {
      const isFns = isFunction(keysOrFuncs[0]);
      // Return when they are NOT changed
      return keysOrFuncs.some(keyOrFunc => {
          if (isFns) {
              return keyOrFunc(prevState) !== keyOrFunc(currState);
          }
          return prevState[keyOrFunc] !== currState[keyOrFunc];
      }) === false;
  };
}
