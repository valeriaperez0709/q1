import { Sushi } from "src/sushi/entities/sushi.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chef {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    name:string;

    @Column()
    skill:string;

    @OneToMany(()=>Sushi,sushi=>sushi.chef)
    sushi:Sushi[];
    @BeforeInsert()
    nameToUpperCase(){
        this.name=this.name.toUpperCase();
    }
}
