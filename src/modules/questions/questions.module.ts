import { Module } from '@nestjs/common';
import { QuestionsResolver } from './controllers/questions.resolver';
import { QuestionsService } from './services/questions.service';



@Module({
  providers: [QuestionsResolver, QuestionsService]
})
export class QuestionsModule {}
