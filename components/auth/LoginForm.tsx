// components/auth/LoginForm.tsx

import Link from "next/link";
import React, { useState } from "react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-10">
  <div className="mb-6">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="email"
    >
      Email
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>
  <div className="mb-6">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor="password"
    >
      Senha
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      id="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </div>
  <div className="flex items-center justify-between">
    <div className="flex items-center justify-between mt-4">
      <button
        className="bg-primary hover:bg-primary-darker text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Entrar
      </button>
      <div className="text-sm text-right">
        <a
          href="#"
          className="text-blue-500 hover:text-blue-700"
          onClick={() => console.log("Recuperar senha")} // Substitua isso pela função de recuperação de senha
        >
          Esqueceu sua senha?
        </a>
      </div>
    </div>
    <div className="mt-4 text-center">
      <Link href="/plans" className="text-blue-500 hover:text-blue-700">
          Criar nova conta
      </Link>
    </div>
  </div>
</form>

  );
};

export default LoginForm;
