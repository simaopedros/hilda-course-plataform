// data/admin.ts
import * as admin from "firebase-admin";

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: (process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    }),
    databaseURL: (process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL as string).replace(/\\n/g, '\n'),
    
    
  });


export default admin;
