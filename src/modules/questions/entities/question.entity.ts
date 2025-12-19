
// export enum QuestionType {
//   TEXT = 'TEXT',        // свободный ответ
//   SINGLE = 'SINGLE',    // один вариант
//   MULTIPLE = 'MULTIPLE' // несколько вариантов
// }



// @Entity('questions')
// export class Question {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   title: string;

//   @Column({ type: 'text', nullable: true })
//   description?: string;

//   @Column({
//     type: 'enum',
//     enum: QuestionType,
//   })
//   type: QuestionType;

//   @OneToMany(() => QuestionOption, option => option.question, {
//     cascade: true,
//   })
//   options?: QuestionOption[];

//   @Column({ default: true })
//   isActive: boolean;

//   @CreateDateColumn()
//   createdAt: Date;
// }
