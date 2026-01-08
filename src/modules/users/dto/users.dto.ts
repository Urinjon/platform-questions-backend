import { Field, ID, ObjectType } from "@nestjs/graphql";
import { StudentType } from "./students.dto";

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  role: string;

  @Field()
  createdAt: Date;

  @Field(() => StudentType, { nullable: true })
  student?: StudentType;
}
