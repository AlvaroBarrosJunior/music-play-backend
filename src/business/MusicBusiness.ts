import { IdGenerator } from "./services/IdGenerator";
import { MusicDatabase } from "../data/MusicDatabase"
import { MusicInputDTO } from "./entities/Music";
import { CustomError } from "./error/CustomError";

export class MusicBusiness {

  constructor(
    private idGenerator: IdGenerator,
    private musicDatabase: MusicDatabase
  ) { }

  async createMusic(music: MusicInputDTO) {
    if (!music.title) throw new CustomError(422, `Missing title`)
    if (!music.author) throw new CustomError(422, `Missing author`)
    if (!music.date) throw new CustomError(422, `Missing date`)
    if (!music.file) throw new CustomError(422, `Missing file`)
    if (!music.genre) throw new CustomError(422, `Missing genres`)
    if (!music.album) throw new CustomError(422, `Missing album`)

    const id = this.idGenerator.generate()

    await this.musicDatabase.createMusic(
      id,
      music.title,
      music.author,
      music.date,
      music.file,
      music.album
    )

    const genres = music.genre

    for (let genre of genres) {
      const genreId = this.idGenerator.generate()

      await this.musicDatabase.musicGenres(
        genreId,
        genre,
        id
      )
    }
  }
}