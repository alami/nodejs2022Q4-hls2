import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { User } from '../models/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../models/db.service';
import { Inject } from '@nestjs/common/decorators';
import {UsersEntity} from "./entities/users.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsersService {
  constructor(
      @Inject(DbService) private db: DbService,
      @InjectRepository(UsersEntity)
      private usersRepository: Repository<UsersEntity>,
  ) {}

  async getAll() {
    return this.usersRepository.find()
    /*return this.db.users.map((el) => {
      const { password, ...res } = el;
      return res;
    });*/
  }

  async getOneById(id: string) {
    return this.usersRepository.findOneBy({ id });
    /*const user = this.db.users
      .map(({ password, ...res }) => res)
      .find((el) => el.id === id);
    return user;*/
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
    /*this.db.users.push(newUser);
    const { password, ...res } = newUser;
    return res;*/
  }

  async updateOne(id: string, dto: UserUpdateDto) {
    //const user = this.db.users.find((el) => el.id === id);
    const user = await this.usersRepository.findOneBy({ id });
    if (user === undefined) {
      return undefined;
    }
    // const userIndex = this.db.users.findIndex((el) => el.id === id);
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
    /*this.db.users.splice(userIndex, 1, updUser);
    const { password, ...res } = updUser;
    return res;*/
  }

  async deleteUser(id: string) {
    // const user = this.db.users.find((el) => el.id === id);
    const user = await this.usersRepository.findOneBy({ id });
    if (user == undefined) {
      return undefined;
    }
    await this.usersRepository.delete(id);
    /*const userIndex = this.db.users.findIndex((el) => el.id === id);
    this.db.users.splice(userIndex, 1);
    const { password, ...res } = user;
    return res;*/
  }
}
