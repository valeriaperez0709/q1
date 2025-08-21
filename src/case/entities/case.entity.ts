import { Victim } from "src/victim/entities/victim.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Case {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    name:string;

    @Column()
    skill:string;

    @OneToMany(()=>Victim,v=>v.case)
    victim:Victim[];
    @BeforeInsert()
    nameToUpperCase(){
        this.name=this.name.toUpperCase();
    }
}
