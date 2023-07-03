import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    let user: CreateUserDto;
    try {
      user = await this.userRepository.findByEmail(email);
    } catch (e) {
      return null;
    }

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = compareSync(password, String(user.password));

    if (!isPasswordValid) return null;

    return user;
  }

  async login(user: CreateUserDto) {
    const payload = { sub: user.id };

    const loggedUser = (await this.userRepository.findById(
      +user.id,
    )) as IUserResponse;

    if (!loggedUser) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, deletedAt, ...loggedUserResponse } =
      loggedUser;

    return {
      user: loggedUserResponse,
      token: this.jwtService.sign(payload),
    };
  }
}

interface IUserResponse {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
