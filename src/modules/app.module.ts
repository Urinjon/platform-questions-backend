import { Module } from "@nestjs/common";

import { QuestionsModule } from "./questions/questions.module";

import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { GraphQLModule } from "@nestjs/graphql";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./common/prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      sortSchema: true,
    }),

    PrismaModule,
    UsersModule,
    QuestionsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
