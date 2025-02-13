import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Montadora } from "./montadora.entity";

@Entity()
export class Veiculo{

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    nome: String

    @Column()
    placa: String

    @ManyToOne(() => Montadora, (montadora) => montadora.veiculos)
    montadora: Montadora

    constructor(nome: string, placa: String, montadora: Montadora){
        this.nome = nome;
        this.placa = placa;
        this.montadora = montadora
    };
}