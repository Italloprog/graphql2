import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Veiculo } from "./veiculo.entity";

@Entity()
export class Montadora{
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    nome: String

    @OneToMany(() => Veiculo, (veiculo) => veiculo.montadora, { cascade: true,})
    veiculos: Veiculo[]

    constructor(nome: string){
        this.nome = nome
    };
}