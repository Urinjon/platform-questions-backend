import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UsersMapper } from "./users.mapper";
import { UserDto } from "./users.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly usersMapper: UsersMapper
  ) {}

  public async findAllUsers(): Promise<UserDto[]> {
    const models = await this.usersRepo.findMany({
      include: { studentProfile: true },
    });

    return this.usersMapper.toDtos(models);
  }

  public async findAllAdmins() {
    const models = await this.usersRepo.findMany({
      where: { role: "ADMIN" },
    });

    return this.usersMapper.toDtos(models);
  }

  async findAllStudents() {
    const models = await this.usersRepo.findMany({
      where: { role: "STUDENT" },
    });

    return this.usersMapper.toDtos(models);
  }

  async findAllStudentsWithProfiles() {
    const models = await this.usersRepo.findMany({
      where: { role: "STUDENT" },
      include: { studentProfile: true },
    });

    return this.usersMapper.toDtos(models);
  }
}
