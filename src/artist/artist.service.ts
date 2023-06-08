import { Inject, Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { Artist, Album, Track } from '../models/interfaces';
import { DbService } from '../models/db.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistsEntity } from './entities/artists.entity';

@Injectable()
export class ArtistService {
  constructor(
      @InjectRepository(ArtistsEntity)
      private artistRepo: Repository<ArtistsEntity>,
      @Inject(DbService) private db: DbService
  ) {}

  getAll() {
    return this.artistRepo.find();
  }

  getOneById(id: string) {
    return this.artistRepo.findOne({where:{id}});
  }

  create({ grammy, name }: ArtistDto) {
    const newArtist = {
      id: uuidv4(),
      grammy,
      name,
    } as Artist;
    const artist = this.artistRepo.create(newArtist);
    return this.artistRepo.save(artist);
  }

  async updateOne(id: string, dto: ArtistDto) {
    const artist = await this.artistRepo.findOne({where:{id}});
    if (artist === undefined) {
      return artist;
    }
    const updArtist = { ...artist, ...dto } as Artist;
    return this.artistRepo.save(updArtist);
  }

  async deleteArtist(id: string) {
    const artist = await this.artistRepo.findOne({where:{id}});
    if (artist === undefined) {
      return undefined;
    }
    await this.artistRepo.delete(id)
  }
}
