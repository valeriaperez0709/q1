import { Victim } from 'src/victim/entities/victim.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Case {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Victim, (v) => v.case)
  victim: Victim[];
  @BeforeInsert()
  nameToUpperCase() {
    this.title = this.title.toUpperCase();
  }
}
