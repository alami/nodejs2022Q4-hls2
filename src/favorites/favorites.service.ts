import { Inject, Injectable } from '@nestjs/common';
import { DbService } from '../models/db.service';

@Injectable()
export class FavoritesService {
  constructor(@Inject(DbService) private db: DbService) {}

  getAll() {
    return this.db.favorites;
  }

  /* TRACKS OPERATION */
  createTrackById(id: string) {
    const track = this.db.tracks.find((el) => el.id === id);
    if (track === undefined) {
      return track;
    }
    this.db.favorites.tracks.push(track);
    return track;
  }

  deleteTrackById(id: string) {
    const trackInd = this.db.favorites.tracks.findIndex((el) => el.id === id);
    if (trackInd === -1) {
      return undefined;
    }
    return this.db.favorites.tracks.splice(trackInd, 1);
  }

  /* ALBUMS OPERATION */
  createAlbumById(id: string) {
    const album = this.db.albums.find((el) => el.id === id);
    if (album === undefined) {
      return album;
    }
    this.db.favorites.albums.push(album);
    return album;
  }

  deleteAlbumById(id: string) {
    const albums = this.db.favorites.albums.findIndex((el) => el.id === id);
    if (albums === -1) {
      return undefined;
    }
    return this.db.favorites.albums.splice(albums, 1);
  }

  /* ARTIST OPERATION */
  createArtistById(id: string) {
    const artist = this.db.artists.find((el) => el.id === id);
    if (artist === undefined) {
      return artist;
    }
    this.db.favorites.artists.push(artist);
    return artist;
  }

  deleteArtistById(id: string) {
    const artists = this.db.favorites.artists.findIndex((el) => el.id === id);
    if (artists === -1) {
      return undefined;
    }
    return this.db.favorites.artists.splice(artists, 1);
  }
}
