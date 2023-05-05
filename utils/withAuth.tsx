// utils/withAuth.tsx

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getAuth } from '@firebase/auth';
import { appFirebase } from '@/data/sdk';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const WithAuthComponent: React.FC = (props) => {
    const router = useRouter();
    const auth = getAuth(appFirebase);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
          router.replace('/login');
        }
      });

      return () => {
        unsubscribe();
      };
    }, [auth]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
