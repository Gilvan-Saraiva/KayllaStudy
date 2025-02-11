import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [UserController],
  providers: [UserService, FirebaseService],
})
export class UserModule {}
