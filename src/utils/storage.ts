type StorageEngine<T> = {
  get: () => T[];
  set: (value: T[]) => void;
  add: (item: T) => void;
  remove: (index: number) => void;
  clear: () => void;
  init: (initialData: T[]) => void;
};

const createMemoryStorage = <T>(): StorageEngine<T> => {
  let store: T[] = [];

  return {
    get: () => store,
    set: (value) => {
      store = value;
    },
    add: (item) => {
      store.push(item);
    },
    remove: (index) => {
      store.splice(index, 1);
    },
    clear: () => {
      store = [];
    },
    init: (initialData: T[]) => {
      if (store.length === 0) {
        store = initialData;
      }
    },
  };
};

const createLocalStorage = <T>(key: string): StorageEngine<T> => ({
  get: () => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  },
  set: (value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  add: (item) => {
    const current = JSON.parse(localStorage.getItem(key) || '[]');
    current.push(item);
    localStorage.setItem(key, JSON.stringify(current));
  },
  remove: (index) => {
    const current = JSON.parse(localStorage.getItem(key) || '[]');
    current.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(current));
  },
  clear: () => {
    localStorage.removeItem(key);
  },
  init: (initialData: T[]) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(initialData));
    }
  },
});

export const createStorage = <T>(key: string, initialData: T[]): StorageEngine<T> => {
  const engineType = import.meta.env.VITE_STORAGE;

  if (engineType === 'local-storage') {
    const engine = createLocalStorage<T>(key);
    engine.init(initialData);
    return engine;
  }

  const memoryEngine = createMemoryStorage<T>();
  memoryEngine.init(initialData);
  return memoryEngine;
};
