import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { Module } from '@nestjs/common';
import { AlbumsEntity } from './entities/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumsEntity])],
  providers: [AlbumsService],
  controllers: [AlbumsController],
  exports: [AlbumsService],
})
export class AlbumsModule {}
