import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ nullable: true })
  coverImage: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column({ type: 'jsonb' })
  content: string;
}
