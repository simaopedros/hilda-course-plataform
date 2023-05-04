// fetchFilteredResources.ts

import { query, where, getDocs, collection } from 'firebase/firestore';
import {firestore} from '@/data/firestore';

export interface Resource {
  id: string;
  UUIDAula: string;
  formatFile: string;
  title: string;
  linkFile: string;
}

export const fetchFilteredResources = async (UUIDAula: string): Promise<Resource[]> => {
  const q = query(
    collection(firestore, 'suplementar-materials'),
    where('UUIDAula', '==', UUIDAula)
  );

  try {
    const querySnapshot = await getDocs(q);
    const resources: Resource[] = [];

    querySnapshot.forEach((doc) => {
      resources.push({
        id: doc.id,
        UUIDAula: doc.data().UUIDAula,
        formatFile: doc.data().formatFile,
        title: doc.data().title,
        linkFile: doc.data().linkFile,
      });
    });

    return resources;
  } catch (error) {
    console.error('Error fetching filtered resources: ', error);
    return [];
  }
};
