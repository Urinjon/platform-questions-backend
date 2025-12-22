import { Module } from '@nestjs/common';
import { QuestionsResolver } from './controllers/questions.resolver';
import { QuestionsService } from './services/questions.service';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/modules/questions/dto/schema.gql', 
      sortSchema: true,
    }),
  ],
  providers: [QuestionsResolver, QuestionsService]
})
export class QuestionsModule {}
