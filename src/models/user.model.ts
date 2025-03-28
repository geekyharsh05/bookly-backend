import { prop, getModelForClass, pre, DocumentType, modelOptions } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@pre<UserClass>('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

@modelOptions({ schemaOptions: { timestamps: true } })
export class UserClass extends TimeStamps {
  public _id!: Types.ObjectId;
  
  @prop({ required: true, unique: true })
  public username!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true, minlength: 8 })
  public password!: string;

  @prop({ default: "" })
  public profileImage?: string;

  public async isPasswordCorrect(this: DocumentType<UserClass>, password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

export const User = getModelForClass(UserClass);
export type UserDocument = InstanceType<typeof UserClass>;