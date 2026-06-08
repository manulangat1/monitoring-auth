import { Module } from '@nestjs/common';
import { MagicLinksService } from './magic-links.service';
import { MagicLinksController } from './magic-links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagicLink } from '../db/entities/magic-link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MagicLink])],
  controllers: [MagicLinksController],
  providers: [MagicLinksService],
  exports: [MagicLinksService],
})
export class MagicLinksModule {}
