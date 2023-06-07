import { Injectable } from '@nestjs/common';
import { Album, Artist, Favarite, Track, User } from './interfaces';

@Injectable()
export class DbService {
  public users: User[] = [];
  public artists: Artist[] = [];
  public tracks: Track[] = [];
  public albums: Album[] = [];
  public favorites: Favarite = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
