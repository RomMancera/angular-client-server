import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../models/Game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  UrlApi = "http://localhost:3000/api";

  constructor(private http : HttpClient) { }

  getGames(){
    return this.http.get(`${this.UrlApi}/games`);
  }

  getGame(id: number){
    return this.http.get(`${this.UrlApi}/games/${id}`);
  }

  saveGame(game : Game){
    return this.http.post(`${this.UrlApi}/games`, game);
  }

  deleteGame(id: number){
    return this.http.delete(`${this.UrlApi}/games/${id}`);
  }

  updatedGame(id: number, updatedGame: Game){
    return this.http.put(`${this.UrlApi}/games/${id}`, updatedGame);
  }
}
