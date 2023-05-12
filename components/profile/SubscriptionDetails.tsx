// components/profile/SubscriptionDetails.tsx
import User from '@/types/User';
import React from 'react';

interface SubscriptionDetailsProps {
  user: User;
}

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold">Detalhes da Assinatura</h2>
      <p>Status da Conta: {user.plan?.status?user.plan?.status: "" }</p>
      <p>Produto: {user.plan?.productName?user.plan?.productName:""}</p>
      <p>Data de Compra: {user.plan?new Date(user.plan?.purchaseDate as number).toLocaleDateString():""}</p>
    </div>
  );
};

export default SubscriptionDetails;
