import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class StudentType {
  @Field()
  lastName: string;

  @Field()
  phone: string;

  @Field()
  university: string;
}
