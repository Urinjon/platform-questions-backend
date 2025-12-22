import { Args, Query, Resolver } from '@nestjs/graphql';
import { QuestionType } from './dto/question.dto';
import { QuestionsService } from './questions.service';


@Resolver(() => QuestionType) 
export class QuestionsResolver {
  constructor(private readonly questionsService: QuestionsService) {}

  @Query(() => [QuestionType], { name: 'questions' }) 
  public async findAll() {
    return await this.questionsService.getAllQuestions();
  }

  @Query(() => QuestionType, { name: 'question', nullable: true })
  public async findOne(@Args('id', { type: () => String }) id: string): Promise<QuestionType | null> {
    const foundQuestion = await this.questionsService.findQuestion(id);
    return foundQuestion;
  }
}