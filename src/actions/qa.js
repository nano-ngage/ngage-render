export const ENABLEASK = 'ENABLEASK';
export const ENABLEAUDQ = 'ENABLEAUDQ';

export function enableAsk(askEnabled) {
  return {
    type: ENABLEASK,
    askEnabled: askEnabled
  };
}

export function enableAudQ(audQEnabled) {
  return {
    type: ENABLEAUDQ,
    audQEnabled: audQEnabled
  };
}
