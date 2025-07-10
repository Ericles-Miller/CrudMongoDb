import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 0 })
  age: number;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ required: false })
  updatedAt: Date;

  setIsActive(status: boolean): void {
    if (this.active === status) {
      const statusText = status ? 'active' : 'inactive';
      throw new BadRequestException(`User is already ${statusText}.`);
    }

    this.active = status;
    this.setUpdatedAt();
  }

  private setUpdatedAt(): void {
    this.updatedAt = new Date();
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
