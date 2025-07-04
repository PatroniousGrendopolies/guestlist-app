/**
 * Safe localStorage operations with error handling
 */

export class SafeStorage {
  private static isAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  static getItem(key: string): string | null {
    try {
      if (!this.isAvailable()) {
        console.warn('localStorage is not available');
        return null;
      }
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Failed to get item from localStorage: ${key}`, error);
      return null;
    }
  }

  static setItem(key: string, value: string): boolean {
    try {
      if (!this.isAvailable()) {
        console.warn('localStorage is not available');
        return false;
      }
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Failed to set item in localStorage: ${key}`, error);
      return false;
    }
  }

  static removeItem(key: string): boolean {
    try {
      if (!this.isAvailable()) {
        console.warn('localStorage is not available');
        return false;
      }
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Failed to remove item from localStorage: ${key}`, error);
      return false;
    }
  }

  static getJSON<T>(key: string): T | null {
    try {
      const item = this.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Failed to parse JSON from localStorage: ${key}`, error);
      return null;
    }
  }

  static setJSON<T>(key: string, value: T): boolean {
    try {
      const jsonString = JSON.stringify(value);
      return this.setItem(key, jsonString);
    } catch (error) {
      console.error(`Failed to stringify JSON for localStorage: ${key}`, error);
      return false;
    }
  }

  static clear(): boolean {
    try {
      if (!this.isAvailable()) {
        console.warn('localStorage is not available');
        return false;
      }
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Failed to clear localStorage', error);
      return false;
    }
  }
}

/**
 * Hook for using safe localStorage in React components
 */
export function useSafeStorage() {
  return {
    getItem: SafeStorage.getItem,
    setItem: SafeStorage.setItem,
    removeItem: SafeStorage.removeItem,
    getJSON: SafeStorage.getJSON,
    setJSON: SafeStorage.setJSON,
    clear: SafeStorage.clear
  };
}