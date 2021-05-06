import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = 'B2Mo4B0m83BAtxgMYgl70bKCh5vb4JHb';
  private _historial: string[] = [];

  get historial(){
    //this._historial = this._historial.splice(0,10)
    return [...this._historial]
  }

  buscarGifs (query: string=''){
    query = query.trim().toLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10)
    }
    
    console.log(this._historial)
  }
}
