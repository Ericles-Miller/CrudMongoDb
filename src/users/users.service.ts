import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create({ age, email, name, password }: CreateUserDto): Promise<User> {
    const userAlreadyExists = await this.userModel.findOne({ email });

    if (userAlreadyExists) throw new BadRequestException('Email already exists');

    const user = new User(name, email, password, age);

    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async findAll(
    name?: string,
    cursor?: string,
    limit = 10,
  ): Promise<{ data: User[]; nextCursor: string | null; count: number }> {
    const query: Record<string, unknown> = {};

    if (name) query.name = { $regex: name, $options: 'i' }; // Busca parcial, case-insensitive

    if (cursor) query._id = { ...(query._id || {}), $gt: cursor };

    const data = await this.userModel.find(query).sort({ _id: 1 }).limit(limit).exec();
    const count = data.length;
    const nextCursor: string | null = count === limit ? String(data[data.length - 1]._id) : null;

    return { data, nextCursor, count };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.email) {
      const existingUser = await this.userModel.findOne({
        email: updateUserDto.email,
        _id: { $ne: id }, // Exclui o usuário atual da busca
      });

      if (existingUser) throw new BadRequestException('Email already exists');
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!updatedUser) throw new NotFoundException(`User with ID ${id} not found`);

    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return deletedUser;
  }

  async setActiveStatus(id: string, status: boolean): Promise<User> {
    const user = await this.findOne(id);
    user.setIsActive(status);

    const updatedUser = await this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();

    if (!updatedUser) throw new NotFoundException(`User with ID ${id} not found`);

    return updatedUser;
  }
}
