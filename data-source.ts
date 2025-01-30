import { DataSource, DataSourceOptions } from "typeorm";

export default new DataSource(<DataSourceOptions>{
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'dev',
  entities: ['src/modules/**/*.entity.{t,j}s'],
  migrations: ['src/db/migrations/*.{t,j}s'],
  synchronize: true,
});
