const KEY = 'qb_sound';
export const getSoundEnabled = () => localStorage.getItem(KEY) !== 'off';
export const toggleSound = () => {
  const next = !getSoundEnabled();
  localStorage.setItem(KEY, next ? 'on' : 'off');
  return next;
};
