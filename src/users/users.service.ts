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
    // return this.db.users.map((el) => {
    //   const { password, ...res } = el;
    //   return res;
    // });
    return this.usersRepository.find()
  }

  getOneById(id: string) {
    const user = this.db.users
      .map(({ password, ...res }) => res)
      .find((el) => el.id === id);
    return user;
  }

  create(dto: CreateUserDto) {
    const newUser = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    } as User;

    this.db.users.push(newUser);
    const { password, ...res } = newUser;
    return res;
  }

  updateOne(id: string, dto: UserUpdateDto) {
    const user = this.db.users.find((el) => el.id === id);
    if (user === undefined) {
      return user;
    }
    const userIndex = this.db.users.findIndex((el) => el.id === id);
    if (user.password !== dto.oldPassword) {
      return 'password';
    }
    const updUser = {
      id: user.id,
      login: user.login,
      password: dto.newPassword,
      version: ++user.version,
      createdAt: user.createdAt,
      updatedAt: Date.now(),
    } as User;

    this.db.users.splice(userIndex, 1, updUser);
    const { password, ...res } = updUser;
    return res;
  }

  deleteUser(id: string) {
    const user = this.db.users.find((el) => el.id === id);
    if (user == undefined) {
      return undefined;
    }
    const userIndex = this.db.users.findIndex((el) => el.id === id);
    this.db.users.splice(userIndex, 1);
    const { password, ...res } = user;
    return res;
  }
}
