import { Request, Response } from "express";
import { MusicInputDTO } from "../business/entities/Music";
import { MusicBusiness } from "../business/MusicBusiness";
import { IdGenerator } from "../business/services/IdGenerator";
import { MusicDatabase } from "../data/MusicDatabase";

const musicBusiness = new MusicBusiness(
  new IdGenerator(),
  new MusicDatabase()
)

export class MusicController {
  async createMusic(req: Request, res: Response) {
    try {
      const input: MusicInputDTO = {
        title: req.body.title,
        author: req.body.author,
        date: req.body.date,
        file: req.body.file,
        genre: req.body.genre,
        album: req.body.album
      }

      await musicBusiness.createMusic(input)

      res.status(200).send({message: "Música criada com sucesso!"})
    } catch (error) {
      res
        .status(error.statusCode || 400)
        .send({ error: error.message })
    }
  }
}