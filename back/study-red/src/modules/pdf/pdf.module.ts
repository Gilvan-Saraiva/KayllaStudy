import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { PdfFile } from './entities/pdf.entity';
import { FirebaseConfig } from '../../config/firebase.config'; //aguardando o db amarel

@Module({
  imports: [TypeOrmModule.forFeature([PdfFile])],
  controllers: [PdfController],
  providers: [PdfService, FirebaseConfig],
})
export class PdfModule {}
