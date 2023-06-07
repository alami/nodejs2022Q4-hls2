import { FavoritesService } from './favorites.service';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

@Controller('favs')
export class FavaritesController {
  constructor(private favService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  gettracks() {
    return this.favService.getAll();
  }

  /* POSTS OPERATIONS */
  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrackFavs(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const track = this.favService.createTrackById(id);
    if (!track) {
      throw new HttpException(
        "trackId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return track;
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const track = this.favService.deleteTrackById(id);
    if (!track) {
      throw new HttpException('trackId not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  /* ALBUMS OPERATION */
  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbumFavs(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const album = this.favService.createAlbumById(id);
    if (!album) {
      throw new HttpException(
        "albumId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return album;
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const album = this.favService.deleteAlbumById(id);
    if (!album) {
      throw new HttpException('albumId not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  /* ARTIST OPERATION */
  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtistFavs(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const artist = this.favService.createArtistById(id);
    if (!artist) {
      throw new HttpException(
        "artistId doesn't exist",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return artist;
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const artist = this.favService.deleteArtistById(id);
    if (!artist) {
      throw new HttpException('artistId not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }
}
