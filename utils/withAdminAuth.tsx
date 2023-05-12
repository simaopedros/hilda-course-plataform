// utils/withAdminAuth.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getAuth } from '@firebase/auth';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { appFirebase } from '@/data/sdk';

const withAdminAuth = (WrappedComponent: React.ComponentType<any>) => {
  const WithAdminAuthComponent: React.FC = (props) => {
    const router = useRouter();
    const auth = getAuth(appFirebase);
    const db = getFirestore(appFirebase);

    useEffect(() => {
        const checkAdmin = async (user: any) => {
          const q = query(collection(db, 'profiles'), where('UID', '==', user.uid));
          const querySnapshot = await getDocs(q);
      
          let isAdmin = false;
          querySnapshot.forEach((doc) => {
            if (doc.data().userType === 'admin') {
               
              isAdmin = true;
            }
          });
      
          if (!isAdmin) {
            router.replace('/dashboard');
          }
        };
      
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            checkAdmin(user);
          } else {
            router.replace('/dashboard');
          }
        });
      
        return () => {
          unsubscribe();
        };
      }, [auth]);

    return <WrappedComponent {...props} />;
  };

  return WithAdminAuthComponent;
};

export default withAdminAuth;
