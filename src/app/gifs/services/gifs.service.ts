import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, JsonpClientBackend } from '@angular/common/http';
import { Gif, SearchGifsResponse } from './../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'B2Mo4B0m83BAtxgMYgl70bKCh5vb4JHb';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    //this._historial = this._historial.splice(0,10)
    return [...this._historial]
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
   /*  if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!); 
    } */
   }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10)

      //Grabar Localstorage
      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=B2Mo4B0m83BAtxgMYgl70bKCh5vb4JHb&q=${query}&limit=10`)
      .subscribe((resp: any) =>{
        console.log(resp.data);
        this.resultados = resp.data;
      })

  }
}
