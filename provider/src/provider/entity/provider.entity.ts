import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public message: string;

  @Column()
  public recipientName: string;
}
