import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DatenagerController } from './datenager.controller';
import { DatenagerService } from './datenager.service';

@Module({
  imports: [HttpModule],
  controllers: [DatenagerController],
  providers: [DatenagerService],
  exports: [DatenagerService],
})
export class DatenagerModule {}
