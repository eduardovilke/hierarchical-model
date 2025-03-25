import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ACategory } from './modules/categories/entities/a-category.entity';
import { CategoriesModule } from './modules/categories/categories.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { MCategory } from './modules/categories/entities/m-category.entity';
import { NCategory } from './modules/categories/entities/n-category.entity';
import { CCategory } from './modules/categories/entities/c-category.entity';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'categories',
        module: CategoriesModule,
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      logger: 'advanced-console',
      logging: 'all',
      username: 'postgres',
      password: 'postgres',
      database: 'dev',
      entities: [ACategory, MCategory, NCategory, CCategory],
      migrations: ['src/db/migrations/*.{t,j}s'],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    CategoriesModule,
  ],
})
export class AppModule {}
