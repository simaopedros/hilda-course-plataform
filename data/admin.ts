// data/admin.ts
import * as admin from "firebase-admin";
const firebasePrivateKey = process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: JSON.parse(`"${firebasePrivateKey}"`),
    }),
    databaseURL: (process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL as string).replace(/\\n/g, '\n'),
    
    
  });
}

export default admin;
