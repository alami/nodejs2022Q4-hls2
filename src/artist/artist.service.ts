import { Inject, Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { Artist, Album, Track } from '../models/interfaces';
import { DbService } from '../models/db.service';

@Injectable()
export class ArtistService {
  constructor(@Inject(DbService) private db: DbService) {}

  getAll() {
    return this.db.artists;
  }

  getOneById(id: string) {
    const artist = this.db.artists.find((el) => el.id === id);
    return artist;
  }

  create({ grammy, name }: ArtistDto) {
    const newArtist = {
      id: uuidv4(),
      grammy,
      name,
    } as Artist;

    this.db.artists.push(newArtist);
    return newArtist;
  }

  updateOne(id: string, dto: ArtistDto) {
    const artist = this.db.artists.find((el) => el.id === id);
    if (artist === undefined) {
      return artist;
    }
    const artistIndex = this.db.artists.findIndex((el) => el.id === id);
    const updArtist = { ...artist, ...dto } as Artist;
    this.db.artists.splice(artistIndex, 1, updArtist);
    return updArtist;
  }

  deleteArtist(id: string) {
    const artist = this.db.artists.find((el) => el.id === id);
    if (artist === undefined) {
      return undefined;
    }
    const artistIndex = this.db.artists.findIndex((el) => el.id === id);
    this.db.artists.splice(artistIndex, 1);

    const favArtInd = this.db.favorites.artists.findIndex((el) => el.id === id);
    if (favArtInd !== -1) {
      this.db.favorites.artists.splice(favArtInd, 1);
    }

    const albumInd = this.db.albums.findIndex((el) => el.artistId === id);
    const album = this.db.albums.find((el) => el.artistId === id);
    if (albumInd !== -1) {
      const obj = { ...album } as Album;
      obj.artistId = null;
      this.db.albums.splice(albumInd, 1, obj);
    }

    const trackInd = this.db.tracks.findIndex((el) => el.artistId === id);
    const track = this.db.tracks.find((el) => el.artistId === id);
    if (trackInd !== -1) {
      const obj = { ...track } as Track;
      obj.artistId = null;
      this.db.tracks.splice(trackInd, 1, obj);
    }
    return artist;
  }
}
