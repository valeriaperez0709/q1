import { Case } from "src/case/entities/case.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Victim {
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
    @ManyToOne(()=>Case,c=>c.victim)
    case:Case;
}
