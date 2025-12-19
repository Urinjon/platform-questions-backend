import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { QuestionType } from '../dto/question.dto';
import { QuestionsService } from '../services/questions.service';

@Resolver(() => QuestionType) 
export class QuestionsResolver {
  constructor(private readonly questionsService: QuestionsService) {}

  @Query(() => [QuestionType], { name: 'questions' }) 
  findAll() {
    return this.questionsService.findAll();
  }

  @Query(() => QuestionType, { name: 'question' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.questionsService.findOne(id);
  }
}