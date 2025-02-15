import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Montadora } from "./montadora.entity";

@Entity()
export class Modelo{

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    nome: String

    @ManyToOne(() => Montadora, (montadora) => montadora.modelos)
    montadora: Montadora

    constructor(nome: string, montadora: Montadora){
        this.nome = nome;
        this.montadora = montadora
    };
}