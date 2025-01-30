import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './modules/categories/category.entity';
import { CategoryModule } from './modules/categories/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'dev',
      entities: [Category],
      migrations: ['src/db/migrations/*.{t,j}s'],
      synchronize: true,
    }),
    CategoryModule,
  ],
})
export class AppModule {}
