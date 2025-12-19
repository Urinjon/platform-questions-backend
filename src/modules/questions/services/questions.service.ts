import { Injectable } from "@nestjs/common";
import { QuestionType } from "../dto/question.dto";



@Injectable()
export class QuestionsService {
  private readonly question: QuestionType[];

  constructor() {
    this.question = [
      {
        id: "1",
        title: "Question 1",
      },
      {
        id: "2",
        title: "Question 2",
      },
      {
        id: "3",
        title: "Question 3",
      }
    ];
  }

  public async getAllQuestions(): Promise<QuestionType[]> {
    return this.question;
  }

  public async findQuestion(id: string): Promise<QuestionType | null> {
    const found = this.question.find((question) => question.id === id);
    if (!found) return null;
    return found;
  }
}
