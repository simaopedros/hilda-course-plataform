import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/data/admin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { uid, password } = req.body;

    try {
      await admin.auth().updateUser(uid, { password });
      res.status(200).json({ message: 'Senha atualizada com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      res.status(500).json({ message: 'Ocorreu um erro ao atualizar a senha' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
};

export default handler;
