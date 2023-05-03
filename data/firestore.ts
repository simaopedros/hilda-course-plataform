// data/firestore.ts

import { getFirestore } from "firebase/firestore";
import { appFirebase } from "./sdk";



const firestore = getFirestore(appFirebase);


export {  firestore };

