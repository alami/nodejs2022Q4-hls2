import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumsModule } from './albums/albums.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { DbModule } from './models/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users/entities/users.entity';

@Module({
  imports: [
    UsersModule,
    DbModule,
    ArtistModule,
    AlbumsModule,
    TrackModule,
    FavoritesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'admin',
      password: 'q1w2e3r4',
      database: 'hls_postgres',
      entities: [UsersEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
