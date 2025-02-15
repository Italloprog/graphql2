import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Modelo } from "./modelo.entity";

@Entity()
export class Montadora{
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    nome: String

    @Column()
    pais: String

    @Column()
    ano_fundacao: number

    @OneToMany(() => Modelo, (modelo) => modelo.montadora, { cascade: true,})
    modelos: Modelo[]

    constructor(nome: string, pais: string, anoFund: number){
        this.nome = nome;
        this.pais = pais;
        this.ano_fundacao = anoFund;
    };
}