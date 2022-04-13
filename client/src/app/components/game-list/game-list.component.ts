import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Game } from 'src/app/models/Game';
import { GamesService } from 'src/app/services/games.service';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  @HostBinding( 'class' ) classes = 'row';

  games: any = [];

  constructor(private gameS : GamesService) { }

  ngOnInit() {
     this.getGames();
  }

  getGames(){
    this.gameS.getGames().subscribe(
      resp => {
       this.games = resp;
       console.log(this.games);
      },
      err => console.log(err),
     );
  }

  deleteGame(id: number){
    this.gameS.deleteGame(id).subscribe(
      resp => {
         console.log(resp);
         this.getGames();
      },
      err => console.log(err)
    )
  }

}
