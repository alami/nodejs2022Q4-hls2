import { Inject, Injectable } from '@nestjs/common';
import { TracksDto } from './dto/tracks.dto';
import { v4 as uuidv4 } from 'uuid';
import { Track } from '../models/interfaces';
import { DbService } from '../models/db.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TracksEntity } from './entities/tracks.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TracksEntity)
    private trackRepo: Repository<TracksEntity>,
    @Inject(DbService) private db: DbService,
  ) {}

  getAll() {
    return this.trackRepo.find();
  }

  getOneById(id: string) {
    return this.trackRepo.findOne({ where: { id } });
  }

  async create(dto: TracksDto) {
    const newtrack = { id: uuidv4(), ...dto } as TracksEntity;
    const track = this.trackRepo.create(newtrack);
    return this.trackRepo.save(track);
  }

  async updateOne(id: string, dto: TracksDto) {
    const track = await this.trackRepo.findOne({ where: { id } });
    if (track === undefined) {
      return undefined;
    }
    const updTrack = { ...track, ...dto } as TracksEntity;
    return this.trackRepo.save(updTrack);
  }

  async deleteTrack(id: string) {
    const track = await this.trackRepo.findOne({ where: { id } });
    if (track === undefined) {
      return undefined;
    }
    await this.trackRepo.delete(id);
  }
}
