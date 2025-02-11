/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PdfFile } from './entities/pdf.entity';
import { FirebaseConfig } from '../../config/studyred.json'; //aguardando o db amarel

@Injectable()
export class PdfService {
  constructor(
    @InjectRepository(PdfFile)
    private pdfRepository: Repository<PdfFile>,
    private firebaseConfig: FirebaseConfig,
  ) {}

  async uploadPdf(file: Express.Multer.File): Promise<PdfFile> {
    const bucket = this.firebaseConfig.getBucket();
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.originalname}`;
    const fileUpload = bucket.file(`pdfs/${filename}`);
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
      resumable: false,
    });

    try {
      await new Promise((resolve, reject) => {
        stream.on('error', reject);
        stream.on('finish', resolve);
        stream.end(file.buffer);
      });

      await fileUpload.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      const pdfFile = new PdfFile();
      pdfFile.filename = file.originalname;
      pdfFile.firebaseUrl = publicUrl;
      pdfFile.createdAt = new Date();
      pdfFile.size = file.size;

      return await this.pdfRepository.save(pdfFile);
    } catch (error) {
      throw new Error(`Erro no upload do arquivo: ${error.message}`);
    }
  }

  async removePdf(id: number): Promise<void> {
    const pdf = await this.pdfRepository.findOne({ where: { id } });

    if (!pdf) {
      throw new NotFoundException('PDF não encontrado');
    }

    try {
      const bucket = this.firebaseConfig.getBucket();
      const filename = pdf.firebaseUrl.split('/').pop();
      await bucket.file(`pdfs/${filename}`).delete();

      await this.pdfRepository.remove(pdf);
    } catch (error) {
      throw new Error(`Erro ao remover arquivo: ${error.message}`);
    }
  }

  async findAll(): Promise<PdfFile[]> {
    return await this.pdfRepository.find();
  }

  async findOne(id: number): Promise<PdfFile> {
    const pdf = await this.pdfRepository.findOne({ where: { id } });

    if (!pdf) {
      throw new NotFoundException('PDF não encontrado');
    }

    return pdf;
  }
}
