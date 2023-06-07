import { ArtistDto } from './dto/artist.dto';
import { ArtistService } from './artist.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getartists() {
    return this.artistsService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getartist(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const artist = this.artistsService.getOneById(id);
    if (artist === undefined) {
      throw new NotFoundException();
    }
    return artist;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createartist(@Body(new ValidationPipe()) createartistDto: ArtistDto) {
    const art = this.artistsService.create(createartistDto);
    if (art === undefined) {
      throw new NotFoundException();
    }
    return art;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateartist(
    @Body(new ValidationPipe()) artistDto: ArtistDto,
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const artist = this.artistsService.updateOne(id, artistDto);
    if (artist === undefined) {
      throw new NotFoundException();
    }
    return artist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteartist(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        version: '4',
      }),
    )
    id: string,
  ) {
    const art = this.artistsService.deleteArtist(id);
    if (art === undefined) {
      throw new NotFoundException();
    }
    return art;
  }
}
