
import { Module } from '@nestjs/common';

import { QuestionsModule } from './questions/questions.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';






@Module({
  imports: [
  
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/modules/questions/dto/schema.gql', 
      sortSchema: true,
    }),

    QuestionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
