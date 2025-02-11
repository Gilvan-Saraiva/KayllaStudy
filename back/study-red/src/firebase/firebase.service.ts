import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../../config/studyred.json'; // Caminho do JSON baixado

@Injectable()
export class FirebaseService {
  private firebaseApp: admin.app.App;
  
  constructor() {
    // Verifica se já existe uma instância do Firebase, se não, inicializa
    if (admin.apps.length === 0) {
      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        databaseURL: 'https://StudyRed.firebaseio.com', // Substitua pelo URL do seu banco
      });
    } else {
      this.firebaseApp = admin.app(); // Se já estiver inicializado, usa a instância existente
    }
  }

  getFirestore(): admin.firestore.Firestore {
    return this.firebaseApp.firestore();
  }
}
