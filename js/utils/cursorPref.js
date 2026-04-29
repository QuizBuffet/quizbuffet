const KEY = 'qb_cursor';

export const CURSORS = [
  { id: 'pencil',    label: 'Pencil',    icon: '✏️' },
  { id: 'hammer',    label: 'Hammer',    icon: '🔨' },
  { id: 'crosshair', label: 'Crosshair', icon: '⊕'  },
  { id: 'default',   label: 'Default',   icon: '↖'  },
];

export const getCursor    = () => localStorage.getItem(KEY) || 'pencil';
export const setCursor    = (id) => { localStorage.setItem(KEY, id); applyCursor(id); };
export const applyCursor  = (id) => { document.documentElement.dataset.cursor = id; };
