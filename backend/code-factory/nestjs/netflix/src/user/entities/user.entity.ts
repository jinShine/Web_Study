import { Exclude } from 'class-transformer';
import { BaseTable } from 'src/common/entity/base-table.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  admin,
  paidUser,
  user,
}

@Entity()
export class User extends BaseTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  @Exclude({
    toPlainOnly: true, // 응답 시에만 제외
    // toClassOnly: true, // 클래스 변환 시에만 제외
  })
  password: string;

  @Column({
    enum: UserRole,
    default: UserRole.user,
  })
  role: UserRole;
}
