import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, data: unknown) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
