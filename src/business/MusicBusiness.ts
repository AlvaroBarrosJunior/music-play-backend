import { IdGenerator } from "./services/IdGenerator";
import { MusicDatabase } from "../data/MusicDatabase"
import { MusicInputDTO } from "./entities/Music";

export class MusicBusiness {

  constructor(
    private idGenerator: IdGenerator,
    private musicDatabase: MusicDatabase
  ) { }

  async createMusic(music: MusicInputDTO) {
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