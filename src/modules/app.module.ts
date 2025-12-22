
import { Module } from '@nestjs/common';

import { QuestionsModule } from './questions/questions.module';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';






@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env', 
    }),
  
    PrismaModule,
    UsersModule,
    QuestionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
