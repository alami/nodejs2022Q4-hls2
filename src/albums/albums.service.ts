import { Inject, Injectable } from '@nestjs/common';
import { AlbumsDto } from './dto/albums.dto';
import { v4 as uuidv4 } from 'uuid';
import { Album, Track } from '../models/interfaces';
import { DbService } from '../models/db.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsEntity } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
      @InjectRepository(AlbumsEntity)
      private albumRepo: Repository<AlbumsEntity>,
      @Inject(DbService) private db: DbService
  ) {}

  getAll() {
    return this.albumRepo.find();
  }

  getOneById(id: string) {
    return this.albumRepo.findOne({where: {id}});
  }

  create(dto: AlbumsDto) {
    const newAlbum = { id: uuidv4(), ...dto } as Album;
    const album = this.albumRepo.create(newAlbum);
    return this.albumRepo.save(album);
  }

  async updateOne(id: string, dto: AlbumsDto) {
    const album =  await this.albumRepo.findOne({where: {id}});
    const updAlbum = { ...album, ...dto } as Album;
    return this.albumRepo.save(updAlbum);
  }

  async deleteAlbum(id: string) {
    const album = await  this.albumRepo.findOne({where: {id}});
    if (album === undefined) {
      return undefined;
    }
    await this.albumRepo.delete(id);
  }
}
