import { MyGQLContext } from "./context-graphql";
import { Montadora } from "./montadora.entity";
import { AppDataSource } from "../data-source";
import { Veiculo } from "./veiculo.entity";

const repositorioMontadoras = AppDataSource.getRepository("Montadora");
const repositorioVeiculos = AppDataSource.getRepository('Veiculo');

export const resolvers = {
  Query: {
    
    montadoras: async (_parent: any, _args: any) => {
      return await repositorioMontadoras.find({
        relations: ['veiculos']
      });
    },

    veiculos: async (_parent: any, _args: any) => {
      return await repositorioVeiculos.find({
        relations: ['montadora']
      });
    },
  },

  Mutation:{
    criarMontadora: async (_parent: any, _args: any) => {
      let {nome} = _args;
      let novaMontadora = new Montadora(nome);
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

    criarVeiculo: async (_parent: any, _args: any) => {
      let {nome, placa, idMontadora} = _args;
      
      let montadoraAssociada = await AppDataSource.manager.findOne(Montadora, {
        where: { id: idMontadora },
      });
      
      if (!montadoraAssociada){
        throw new Error('id da montadora não encontrado boy');
      }

      let novoVeiculo = new Veiculo(nome,placa,montadoraAssociada);

      let veiculoCriado = await repositorioVeiculos.save(novoVeiculo);
      return veiculoCriado;
    },

    deletarVeiculos: async (_parent: any, _args: any) => {
      let {id} = _args;
      let veiculoApagar = await repositorioVeiculos.findOne({
        where: {id: id}
      })
     
      if (!veiculoApagar){
        throw new Error('id nao encontrado');
      }

      let copiaVeiculo = { ...veiculoApagar };

      await repositorioVeiculos.remove(veiculoApagar);
      
      return copiaVeiculo;
    },
  }
};