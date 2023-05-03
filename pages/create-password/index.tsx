import { useState } from 'react';
import { useRouter } from 'next/router';
import admin from '@/data/admin';
// Atualize o caminho para o arquivo admin se necessário

const CreatePassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>('');
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        setError('As senhas não correspondem');
        return;
      }
  
      try {
        const uid = router.query.uid as string;
        const response = await fetch('/api/update-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid, password }),
        });
  
        if (!response.ok) {
          throw new Error(await response.text());
        }
  
        setError('');
        router.push('/'); // Redirecione para a página inicial ou para outra página desejada após a criação da senha
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocorreu um erro ao criar a senha.');
        }
      }
    };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-8 bg-white rounded-2xl shadow-md"
      >
        <h1 className="text-3xl font-bold mb-6">Criar senha</h1>
        <label htmlFor="email" className="block mb-2">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          //readOnly
          className="w-full px-4 py-2 mb-4 rounded-md border border-gray-300"
        />
        <label htmlFor="password" className="block mb-2">
          Senha
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-md border border-gray-300"
          required
        />
        <label htmlFor="confirm-password" className="block mb-2">
          Confirmar senha
        </label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-md border border-gray-300"
          required
        />
        {error && (
          <p className="text-red-600 text-sm mb-4">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500"
        >
          Criar senha
        </button>
      </form>
    </div>
  );
};

export default CreatePassword;
