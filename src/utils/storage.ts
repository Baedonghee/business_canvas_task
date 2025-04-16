type StorageEngine<T> = {
  get: () => T[];
  set: (value: T[]) => void;
  remove: (index: number) => void;
  init: (initialData: T[]) => void;
};

const createMemoryStorage = <T>(): StorageEngine<T> => {
  let store: T[] = [];

  return {
    get: () => store,
    set: (value) => {
      store = value;
    },
    remove: (index) => {
      store.splice(index, 1);
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
  remove: (index) => {
    const current = JSON.parse(localStorage.getItem(key) || '[]');
    current.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(current));
  },
  init: (initialData: T[]) => {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : null;

    if (!raw || !Array.isArray(parsed) || parsed.length === 0) {
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
