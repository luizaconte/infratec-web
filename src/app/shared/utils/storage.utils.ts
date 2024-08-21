export class StorageUtils {

  static addSession<T>(name: string, value: T): void {
    sessionStorage.setItem(name, btoa(JSON.stringify(value)));
  }

  static addLocal<T>(name: string, value: T): void {
    localStorage.setItem(name, btoa(JSON.stringify(value)));
  }

  static valueLocal<T>(name: string): T {
    return this.valueStorage<T>(name, StorageType.LOCAL);
  }

  static valueSession<T>(name: string): T {
    return this.valueStorage<T>(name, StorageType.SESSION);
  }

  private static valueStorage<T>(name: string, type: StorageType): T {
    let storage: string = type === StorageType.SESSION ? sessionStorage.getItem(name) : localStorage.getItem(name);
    try {
      storage = JSON.parse(atob(storage));
    } catch {
      storage = null;
    }
    return storage as T;
  }
}

enum StorageType {
  SESSION,
  LOCAL
}
