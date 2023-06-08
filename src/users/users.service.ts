import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { User } from '../models/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../models/db.service';
import { Inject } from '@nestjs/common/decorators';
import { UsersEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DbService) private db: DbService,
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async getAll() {
    return this.usersRepository.find();
  }

  async getOneById(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  async create(dto: CreateUserDto) {
    const now = Date.now().toString();
    const newUser = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: now,
      updatedAt: now,
    } as UsersEntity;
    const user = await this.usersRepository.create(newUser);
    return this.usersRepository.save(user);
  }

  async updateOne(id: string, dto: UserUpdateDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user === undefined) {
      return undefined;
    }
    if (user.password !== dto.oldPassword) {
      return 'password';
    }
    const updUser = {
      id: user.id,
      login: user.login,
      password: dto.newPassword,
      version: ++user.version,
      createdAt: user.createdAt,
      updatedAt: new Date().getTime().toString(),
    } as UsersEntity;
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user == undefined) {
      return undefined;
    }
    await this.usersRepository.delete(id);
  }
}
