import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UsersMapper } from './users.mapper';

@Module({
  providers: [UsersService, UsersRepository, UsersMapper],
})
export class UsersModule {}
