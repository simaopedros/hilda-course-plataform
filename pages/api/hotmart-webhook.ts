
import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/data/admin';
import nodemailer from 'nodemailer';

async function sendEmail(to: any , subject: any, htmlContent: any) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NEXT_PUBLIC_GMAIL_USER,
      pass: process.env.NEXT_PUBLIC_GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: to,
    subject: subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email enviado para: ${to}`);
  } catch (error) {
    console.error('Erro ao enviar o email:', error);
  }
}



interface FirebaseAuthError extends Error {
    code: string;
  }
  

async function createOrUpdateUser(data: any) {
  console.log('Criando ou atualizando usuário...');

    const { buyer, product, purchase, subscription } = data;
    let error; // Declare a variável "error" aqui
  
    // Verificar se o usuário já existe
    console.log('Verificando se o usuário já existe...');

    const usersRef = admin.auth();
    let user;
    try {
        user = await usersRef.getUserByEmail(buyer.email);
        console.log('Usuario encontrado:', user.uid);
      } catch (error) {
        console.log('Usuario não encontrado');
        const firebaseError = error as FirebaseAuthError;
      
        if (firebaseError.code === 'auth/user-not-found') {
          console.log('Usuário não encontrado, criando um novo usuário...');
          // Usuário não encontrado, criar um novo usuário
          user = await usersRef.createUser({
            email: buyer.email,
            displayName: buyer.name,
            // Adicione outros campos necessários
          });
          console.log('Usuário criado:', user.uid);
          // Enviar email para o usuário criar uma senha
          console.log('Enviando email para o usuário criar uma senha...');

          const emailSubject = 'Bem-vindo! Por favor, crie sua senha';
          const emailContent = `
            <h1>Bem-vindo(a) ${buyer.name}!</h1>
            <p>Por favor, clique no link abaixo para criar sua senha:</p>
            <a href="https://your-app-domain.com/create-password?uid=${user.uid}">Criar senha</a>
          `;
          await sendEmail(buyer.email, emailSubject, emailContent);
        } else {
          console.error('Erro ao obter usuário:', error);
          return;
        }
      }
      
  
    // Adicionar ou atualizar dados do plano na coleção '/profiles'
    console.log('// Adicionar ou atualizar dados do plano na coleção /profiles')

    const profileRef = admin.firestore().collection('/profiles').doc(user.uid);
    const profileData = {
        UID: user.uid,
        email: user.email,
        name: user.displayName,
        createdAt: user.metadata.creationTime,
        plan: {
        productId: product.id,
        productName: product.name,
        purchaseDate: purchase.order_date,
        transaction: purchase.transaction,
        status: subscription.status,
        // Adicione outros campos necessários
      },
    };
  
    await profileRef.set(profileData, { merge: true });
    console.log('Dados salvos no Firebase com sucesso!'); // Adicione este log de console

  }
  

const handleHotmartWebhook = async (req: NextApiRequest, res: NextApiResponse) => {
    const eventData = req.body;

    

    // Verificar o tipo de evento e processar adequadamente
    switch (eventData.event) {
        
        case 'PURCHASE_COMPLETE':
          console.log('Evento de compra recebido:', eventData.event);
          try {
            await createOrUpdateUser(eventData.data);
            console.log('Dados do evento:', eventData.data);
          } catch (error) {
            console.error('Erro ao criar ou atualizar usuário:', error);
          }

            // Processar evento de compra
            break;
        case 'PURCHASE_CANCELED':
            // Processar evento de reembolso
            break;
        case 'SUBSCRIPTION_CANCELLATION':
            // Processar evento de acesso
            break;
        case 'UPDATE_SUBSCRIPTION_CHARGE_DATE':
        // Adicione outros eventos conforme necessário
        case 'PURCHASE_PROTEST':
        // Adicione outros eventos conforme necessário
        case 'PURCHASE_BILLET_PRINTED':
        // Adicione outros eventos conforme necessário
        case 'SWITCH_PLAN':
        // Adicione outros eventos conforme necessário
        case 'PURCHASE_CHARGEBACK':
        // Adicione outros eventos conforme necessário
        case 'PURCHASE_DELAYED':
        // Adicione outros eventos conforme necessário
        case 'PURCHASE_REFUNDED':
        // Adicione outros eventos conforme necessário
        case 'PURCHASE_EXPIRED':
        // Adicione outros eventos conforme necessário
        case 'PURCHASE_APPROVED':
        // Adicione outros eventos conforme necessário
        case 'PURCHASE_OUT_OF_SHOPPING_CART':
        // Adicione outros eventos conforme necessário
        case '':
        // Adicione outros eventos conforme necessário
        case '':
        // Adicione outros eventos conforme necessário
        default:
            console.log('Evento não identificado:', eventData.event);
    }

    res.status(200).json({ message: 'Webhook recebido e processado com sucesso.' });
};

export default handleHotmartWebhook;
