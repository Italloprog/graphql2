import { Montadora } from "./montadora.entity";
import { AppDataSource } from "../data-source";
import { Modelo } from "./modelo.entity";

const repositorioMontadoras = AppDataSource.getRepository("Montadora");
const repositorioModelos = AppDataSource.getRepository('Modelo');

export const resolvers = {
  Query: {
    montadoras: async (_parent: any, _args: any) => {
      return await repositorioMontadoras.find({
        relations: ['modelos']
      });
    },

    modelos: async (_parent: any, _args: any) => {
      return await repositorioModelos.find({
        relations: ['montadora']
      });
    },
  },

  Mutation:{
    criarMontadora: async (_parent: any, _args: any) => {
      let {nome, pais, ano_fundacao} = _args;
      let novaMontadora = new Montadora(nome, pais, ano_fundacao);
      let montadoraCriada = await repositorioMontadoras.save(novaMontadora);
      return montadoraCriada;
    },

    deletarMontadora: async (_parent: any, _args: any) => {
      let {id} = _args;
      let montadoraApagar = await repositorioMontadoras.findOne({
        where: {id: id}
      })
     
      if (!montadoraApagar){
        throw new Error('id nao encontrado');
      }

      let copiaMontadora = { ...montadoraApagar };

      await repositorioMontadoras.remove(montadoraApagar);
      
      return copiaMontadora;
    },

    criarModelo: async (_parent: any, _args: any) => {
      let {nome, idMontadora} = _args;
      
      let montadoraAssociada = await AppDataSource.manager.findOne(Montadora, {
        where: { id: idMontadora }, relations: ['modelos']
      });
      
      if (!montadoraAssociada){
        throw new Error('id da montadora não encontrado boy');
      }

      let novoModelo = new Modelo(nome,montadoraAssociada);

      let modeloCriado = await repositorioModelos.save(novoModelo);
      return modeloCriado;
    },

    deletarModelos: async (_parent: any, _args: any) => {
      let {id} = _args;
      let modeloApagar = await repositorioModelos.findOne({
        where: {id: id}, relations: ['montadora']
      });
     
      if (!modeloApagar){
        throw new Error('id nao encontrado');
      }

      let copiaModelo = { ...modeloApagar };

      await repositorioModelos.remove(modeloApagar);
      
      return copiaModelo;
    },
  },
};