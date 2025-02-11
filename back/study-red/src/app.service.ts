import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const vtnc = process.env.FIREBASE_ADMIN_CREDENTIALS
    console.log(vtnc);
    return 'hello';
  }
}
