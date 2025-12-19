import { Injectable } from '@nestjs/common';
import { QuestionType } from '../dto/question.dto';


@Injectable()
export class QuestionsService {
  private readonly questions: QuestionType[] = [
    { id: '1', title: 'First Post' },
    { id: '2', title: 'Second Post'},
  ];

  findAll(): QuestionType[] {
    return this.questions;
  }

  findOne(id: number): QuestionType | null {
    const found = this.questions.find(post => post.id === String(id))
    if (!found) return null;
    return found;
  }
}
