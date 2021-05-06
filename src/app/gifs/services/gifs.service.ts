import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'B2Mo4B0m83BAtxgMYgl70bKCh5vb4JHb';
  private _historial: string[] = [];

  public resultados: any[] = [];

  get historial() {
    //this._historial = this._historial.splice(0,10)
    return [...this._historial]
  }

  constructor(private http: HttpClient) { }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10)
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=B2Mo4B0m83BAtxgMYgl70bKCh5vb4JHb&q=${query}&limit=10`)
      .subscribe((resp: any) =>{
        console.log(resp.data);
        this.resultados = resp.data;
      })

  }
}
