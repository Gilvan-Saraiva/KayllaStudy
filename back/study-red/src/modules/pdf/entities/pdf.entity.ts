import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PdfFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  firebaseUrl: string;
  
  @Column()
  createdAt: Date;

  @Column()
  size: number;
}
