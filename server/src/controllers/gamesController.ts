import {json, Request, Response} from 'express';

import pool from '../database';

class GamesController {

    public async list (req: Request, res: Response) {
        await pool.query('SELECT * FROM games', function(err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    }

    public async getOne(req : Request, res : Response): Promise<any>{
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM games WHERE id=?',[id], function(err, result, fields) {
            if (err) throw err;
            if(result.length > 0){
                return res.json(result[0]);
            }
            res.status(404).json({text: "The game doesn't exist"});
        });
    }

   public async create(req: Request, res : Response): Promise<void>{
       await pool.query('INSERT INTO games set ?', [req.body]);
       res.json({message: 'The game is already save'});
   }

   public async delete(req: Request, res : Response): Promise<void>{
       const {id} = req.params;
       await pool.query('DELETE FROM games WHERE id=?',[id], function(err, result, fields) {
        if (err) throw err;
        res.json({text: "The game was deleted"});
    });
   }

   public async update(req: Request, res : Response): Promise<void>{
    const {id} = req.params;
    await pool.query('UPDATE games set ? WHERE id = ?',[req.body, id], function(err, result, fields) {
     if (err) throw err;
     res.json({message: "The game was updated"});
 });
   }

}

 const gamesController = new GamesController
 export default gamesController;
