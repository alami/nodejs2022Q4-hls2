import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistsEntity } from './entities/artists.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistsEntity])],
  controllers: [ArtistsController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
