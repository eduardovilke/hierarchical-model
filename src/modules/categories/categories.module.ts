import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ACategory } from './entities/a-category.entity';
import { ACategoryController } from './controllers/a-category.controller';
import { MCategoryController } from './controllers/m-category.controller';
import { ACategoryService } from './services/a-category.service';
import { MCategoryService } from './services/m-category.service';
import { MCategory } from './entities/m-category.entity';
import { NCategoryController } from './controllers/n-category.controller';
import { NCategoryService } from './services/n-category.service';
import { NCategory } from './entities/n-category.entity';
import { CCategory } from './entities/c-category.entity';
import { CCategoryController } from './controllers/c-category.controller';
import { CCategoryService } from './services/c-category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ACategory, MCategory, NCategory, CCategory]),
  ],
  controllers: [
    ACategoryController,
    MCategoryController,
    NCategoryController,
    CCategoryController,
  ],
  providers: [
    ACategoryService,
    MCategoryService,
    NCategoryService,
    CCategoryService,
  ],
})
export class CategoriesModule {}
