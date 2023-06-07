import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
@Injectable()
export class UsersMiddleware implements NestMiddleware {
  constructor(private user: UsersService) {}
  use(req: Request, res: Response, next: () => void) {
    // const method = req.method;
    // const { id } = req.params;
    // const { body } = req;
    next();
  }
}
