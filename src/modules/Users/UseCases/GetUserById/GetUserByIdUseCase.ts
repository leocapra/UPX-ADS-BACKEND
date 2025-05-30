import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../Repository/IUserRepository";

@injectable()
class GetUserByIdUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(data: number): Promise<any> {
    const user = await this.userRepository.findById(data);

    console.log("user", user);
    return user;
  }
}

export { GetUserByIdUseCase };
