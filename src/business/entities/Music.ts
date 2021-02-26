export class Music {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly author: string,
    public readonly date: Date,
    public readonly file: string,
    public readonly genre: string[],
    public readonly album: string
  ) { }
}

export interface MusicInputDTO {
  title: string,
  author: string,
  date: Date,
  file: string,
  genre: string[],
  album: string
}