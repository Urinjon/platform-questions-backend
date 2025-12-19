import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { QuestionsModule } from './questions/questions.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql', // Path to the generated schema file
      sortSchema: true, // Sorts the generated schema lexicographically
    }),
    QuestionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
