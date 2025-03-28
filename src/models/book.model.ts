import { prop, getModelForClass, modelOptions, Ref, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { User } from './user.model';

@modelOptions({ schemaOptions: { timestamps: true } })
export class BookClass extends TimeStamps {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public caption!: string;

  @prop({ required: true })
  public image!: string;

  @prop({ required: true, min: 1, max: 5 })
  public rating!: number;

  @prop({ ref: () => User, required: true })
  public user!: Ref<typeof User>;
}

export const Book = getModelForClass(BookClass);
export type BookDocument = InstanceType<typeof Book>;