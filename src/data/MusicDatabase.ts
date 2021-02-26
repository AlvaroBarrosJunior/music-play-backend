import { BaseDatabase } from "./BaseDatabase";
import { Music } from "../business/entities/Music";
import { CustomError } from "../business/error/CustomError";

export class MusicDatabase extends BaseDatabase {
  
  private static MUSIC_TABLE_NAME = "music_play_music"
  private static GENRES_TABLE_NAME = "music_play_music_genres"

  private static toMusicModel(music: any): Music {
    return new Music(
      music.id,
      music.title,
      music.author,
      music.date,
      music.file,
      music.genre,
      music.album
    )
  }

  public async createMusic(
    id: string,
    title: string,
    author: string,
    date: Date,
    file: string,
    album: string
  ): Promise<void> {
    try {
      await BaseDatabase.connection(MusicDatabase.MUSIC_TABLE_NAME)
        .insert({
          id,
          title,
          author,
          date,
          file,
          album
        })
    } catch (error) {
      throw new CustomError(500, "An unexpected error ocurred")
    }
  }

  public async musicGenres(
    id: string,
    genre: string,
    musicId: string
  ): Promise<void> {
    try {
      await BaseDatabase.connection(MusicDatabase.GENRES_TABLE_NAME)
        .insert({
          id,
          genre,
          musicId
        })
    } catch (error) {
      throw new CustomError(500, "An unexpected error ocurred")
    }
  }
}