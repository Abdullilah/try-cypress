import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor() {}

  public get() {
    return {
      name: 'Jack',
      surname: 'Siwiec',
      points: 302,
    };
  }
}
