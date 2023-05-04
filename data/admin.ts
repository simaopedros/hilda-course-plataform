// data/admin.ts
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  const privateKey = Buffer.from(process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY as string, 'base64').toString('utf-8').replace(/\\n/g, '\n');

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });
  }

export default admin;
