// pages/login.tsx

import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { appFirebase } from '@/data/sdk';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { FirebaseError } from '@firebase/util';
import { useRouter } from 'next/router';



const Login: React.FC = () => {
  const router = useRouter();
  const auth = getAuth(appFirebase);

  const [toast, setToast] = useState<{ type: 'info' | 'success' | null; message: string | null }>({
    type: null,
    message: null,
  });

  const handleLoginSubmit = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        // Obter o token de autenticação do usuário
        const authToken = await user.getIdToken();

        // Salvar o token no localStorage
        localStorage.setItem('authToken', authToken);
      }

      console.log('Usuário logado com sucesso:', user);
      setToast({ type: 'success', message: 'Logado com Sucesso.' });
      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro no login:', errorCode, errorMessage);

        setToast({ type: 'info', message: 'Erro ao logar.' });
      } else {
        console.error('Erro desconhecido no login:', error);

        setToast({ type: 'info', message: 'Erro desconhecido ao logar.' });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-300 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <LoginForm onSubmit={handleLoginSubmit} />
        {toast.type && (
          <div className="toast toast-end mt-4">
            <div className={`alert alert-${toast.type}`}>
              <div>
                <span>{toast.message}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
