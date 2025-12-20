
import { Module } from '@nestjs/common';

import { QuestionsModule } from './questions/questions.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';






@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Делаем конфиг доступным везде
      envFilePath: '.env', // Указываем .env файл
    }),
  
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/modules/questions/dto/schema.gql', 
      sortSchema: true,
    }),

    PrismaModule,
    QuestionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
