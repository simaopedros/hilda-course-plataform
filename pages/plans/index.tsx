// plans/index.tsx
import Image from 'next/image';
import { useState, useEffect } from 'react';

const PlansPage = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const openModal = (plan: string) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const redirectToPayment = () => {
    let paymentUrl = '';

    switch (selectedPlan) {
      case 'mensal':
        paymentUrl = 'https://pay.hotmart.com/G82544453G?off=e3qmawp5';
        break;
      case 'semestral':
        paymentUrl = 'https://pay.hotmart.com/G82544453G?off=fhxff15n';
        break;
      case 'anual':
        paymentUrl = 'https://pay.hotmart.com/G82544453G?off=f970kzps';
        break;
    }

    if (name && email) {
      setShowModal(false);
      window.location.href = paymentUrl;
    }
  };

  return (
    <div className="bg-base-100 min-h-screen p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Escolha o plano perfeito</h1>

      <div className="countdown font-mono text-2xl mb-8">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bordered">
          <figure>
            <Image src="https://picsum.photos/id/1005/400/250" alt='' height={250} width={400} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Assinatura Anual</h2>
            <p className="text-xl font-semibold">R$ 106,80/ano</p>
            <p className="text-sm">Equivale a R$ 8,90/mês</p>
            <p className="text-sm">Economize 20%</p>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => openModal('anual')} >Escolher</button>
            </div>
          </div>
        </div>

        <div className="card bordered">
          <figure>
            <Image src="https://picsum.photos/id/1/400/250"   alt='' height={250} width={400} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Assinatura Semestral</h2>
            <p className="text-xl font-semibold">R$ 62,40/6 meses</p>
            <p className="text-sm">Equivale a R$ 10,40/mês</p>
            <p className="text-sm">Economize 10%</p>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => openModal('semestral')}>Escolher</button>
            </div>
          </div>
        </div>

        <div className="card bordered">
          <figure>
            <Image src="https://picsum.photos/id/1009/400/250" alt='' height={250} width={400} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Assinatura Mensal</h2>
            <p className="text-xl font-semibold">R$ 11,60/mês</p>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={() => openModal('mensal')} >Escolher</button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl mb-4">Insira seu nome e e-mail</h2>
            <input
              className="border border-gray-300 p-2 mb-4 w-full"
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border border-gray-300 p-2 mb-4 w-full"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full"
              onClick={redirectToPayment}
            >
              Prosseguir para o pagamento
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlansPage;
