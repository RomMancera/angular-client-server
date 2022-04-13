import { Component, HostBinding, OnInit } from '@angular/core';
import { Game } from 'src/app/models/Game';
import { GamesService } from 'src/app/services/games.service';
import { Router,ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding( 'class' ) clases = 'row';
  

  game : Game = {
    id : 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  };

  edit : boolean = false;

  constructor(private gameS : GamesService,
              private router : Router,
              private ActRoute: ActivatedRoute) { }

  ngOnInit(){
   const params = this.ActRoute.snapshot.params;
    if(params.id){
      this.gameS.getGame(params.id).subscribe(
        resp =>{
         console.log(resp);
         this.game = resp;
         this.edit = true;
        },
        err => console.error(err)
      )
    }
  }

  saveNewGame(){
    delete this.game.created_at;
    delete this.game.id;

    this.gameS.saveGame(this.game).subscribe(
      resp =>{
        console.log(resp);
        this.router.navigate(['/games']);
      },
      err => console.log(err)
    )
  }

  updateGame(){
    delete this.game.created_at;

    this.gameS.updatedGame(this.game.id, this.game).subscribe(
      res =>{
       console.log(res)
       this.router.navigate(['/games']);
      },
      err => console.error(err)
    )
  }

}
