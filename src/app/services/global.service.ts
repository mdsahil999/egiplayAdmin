import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  base_url: string = "http://159.65.148.113/"
  constructor() { }
}
