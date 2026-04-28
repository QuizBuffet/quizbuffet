// Removes every QuizBuffet key from both localStorage and sessionStorage
export function clearAll() {
  Object.keys(localStorage)
    .filter(k => k.startsWith('qb_'))
    .forEach(k => localStorage.removeItem(k));
  Object.keys(sessionStorage)
    .filter(k => k.startsWith('qbs_'))
    .forEach(k => sessionStorage.removeItem(k));
}
