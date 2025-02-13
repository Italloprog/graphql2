import "reflect-metadata";
import { DataSource } from "typeorm";
import { Montadora } from "./src/montadora.entity";
import { Veiculo } from "./src/veiculo.entity";

export const AppDataSource = new DataSource({
  type: "postgres",

  host: "localhost",
  port: 5432,
  database: "atv_graphql",
  username: "postgres",
  password: "postgres",

  synchronize: true,
  logging: false,
  entities: [Montadora,Veiculo], // pode ser como abaixo
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Datasource is UP!!!");
  })
  .catch((err) => {
    console.log("Erro ao inicilizar o DS!", err);
  });
