import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UsersMapper } from "./users.mapper";
import { UserType } from "./dto/users.dto";


@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly usersMapper: UsersMapper
  ) {}

  public async findAllUsers(): Promise<UserType[]> {
    const models = await this.usersRepo.findMany({
      include: { studentProfile: true },
    });

    return this.usersMapper.toGraphQLList(models);
  }

  public async findAllAdmins(): Promise<UserType[]> {
    const models = await this.usersRepo.findMany({
      where: { role: "ADMIN" },
    });

    return this.usersMapper.toGraphQLList(models);
  }

  public async findAllStudents(): Promise<UserType[]> {
    const models = await this.usersRepo.findMany({
      where: { role: "STUDENT" },
    });

    return this.usersMapper.toGraphQLList(models);
  }

  public async findAllStudentsWithProfiles(): Promise<UserType[]> {
    const models = await this.usersRepo.findMany({
      where: { role: "STUDENT" },
      include: { studentProfile: true },
    });

    return this.usersMapper.toGraphQLList(models);
  }
}
