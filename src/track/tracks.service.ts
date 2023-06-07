import { Inject, Injectable } from '@nestjs/common';
import { TracksDto } from './dto/tracks.dto';
import { v4 as uuidv4 } from 'uuid';
import { Track } from '../models/interfaces';
import { DbService } from '../models/db.service';

@Injectable()
export class TracksService {
  constructor(@Inject(DbService) private db: DbService) {}

  getAll() {
    return this.db.tracks;
  }

  getOneById(id: string) {
    const track = this.db.tracks.find((el) => el.id === id);
    return track;
  }

  create(dto: TracksDto) {
    const newtrack = { ...dto } as Track;
    newtrack.id = uuidv4();
    const art = this.db.artists.find((el) => el.id === dto.artistId);
    const album = this.db.albums.find((el) => el.id === dto.albumId);
    if (album === undefined && dto.albumId !== null) {
      return undefined;
    }
    if (art === undefined && dto.artistId !== null) {
      return undefined;
    }
    this.db.tracks.push(newtrack);
    return newtrack;
  }

  updateOne(id: string, dto: TracksDto) {
    const track = this.db.tracks.find((el) => el.id === id);
    const art = this.db.artists.find((el) => el.id === dto.artistId);
    const album = this.db.albums.find((el) => el.id === dto.albumId);
    if (album === undefined && dto.albumId !== null) {
      return undefined;
    }
    if (art === undefined && dto.artistId !== null) {
      return undefined;
    }
    if (track === undefined) {
      return undefined;
    }
    const trackIndex = this.db.tracks.findIndex((el) => el.id === id);
    const updtrack = { ...track, ...dto } as Track;
    this.db.tracks.splice(trackIndex, 1, updtrack);
    return updtrack;
  }

  deleteTrack(id: string) {
    const track = this.db.tracks.find((el) => el.id === id);
    if (track === undefined) {
      return undefined;
    }
    const trackIndex = this.db.tracks.findIndex((el) => el.id === id);
    this.db.tracks.splice(trackIndex, 1);
    const ind = this.db.favorites.tracks.findIndex((el) => el.id === id);
    if (ind !== -1) {
      this.db.favorites.tracks.splice(ind, 1);
    }
    return track;
  }
}
