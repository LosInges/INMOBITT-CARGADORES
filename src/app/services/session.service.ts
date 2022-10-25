import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private myStorage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.myStorage = storage;
  }

  public set(key: string, value: string): Promise<any> {
    return this.myStorage?.set(key, value);
  }

  public get(key: string): Promise<any> {
    return this.myStorage?.get(key);
  }

  public clear(): Promise<void> {
    return this.myStorage?.clear();
  }

  public keys(): Promise<string[]> {
    return this.myStorage?.keys();
  }
}
