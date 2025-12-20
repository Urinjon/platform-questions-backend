import { Injectable } from "@nestjs/common";
import { QuestionType } from "../dto/question.dto";
import { PrismaService } from "src/prisma/prisma.service";



@Injectable()
export class QuestionsService {
  private readonly question: QuestionType[];


  constructor(
    private readonly prisma: PrismaService
  ) {
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
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
    console.log(users);
    return this.question;
  }

  public async findQuestion(id: string): Promise<QuestionType | null> {
    const found = this.question.find((question) => question.id === id);
    if (!found) return null;
    return found;
  }
}
