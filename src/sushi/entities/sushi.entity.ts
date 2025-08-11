import { Chef } from "src/chef/entities/chef.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sushi {
    @PrimaryGeneratedColumn("uuid")
    id:string;
    @Column('text',{
        nullable:false
    })
    name:string;
    @Column('numeric',{
        nullable:false
    })
    price:number;
    @Column('text',{
        array:true
    })
    ingredients:string[]
    @Column('date',{
        default:()=>'CURRENT_TIMESTAMP'
    })
    createAt?:Date;
    @ManyToOne(()=>Chef,chef=>chef.sushi)
    chef:Chef;
}
