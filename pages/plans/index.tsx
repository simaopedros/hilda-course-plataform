// plans/index.tsx
import { useState, useEffect } from 'react';

const PlansPage = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-base-100 min-h-screen p-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Escolha o plano perfeito</h1>

      <div className="countdown font-mono text-2xl mb-8">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bordered">
          <figure>
            <img src="https://picsum.photos/id/1005/400/250" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Assinatura Anual</h2>
            <p className="text-xl font-semibold">R$ 106,80/ano</p>
            <p className="text-sm">Equivale a R$ 8,90/mês</p>
            <p className="text-sm">Economize 20%</p>
            <div className="card-actions">
              <button className="btn btn-primary">Escolher</button>
            </div>
          </div>
        </div>

        <div className="card bordered">
          <figure>
            <img src="https://picsum.photos/id/1/400/250" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Assinatura Semestral</h2>
            <p className="text-xl font-semibold">R$ 62,40/6 meses</p>
            <p className="text-sm">Equivale a R$ 10,40/mês</p>
            <p className="text-sm">Economize 10%</p>
            <div className="card-actions">
              <button className="btn btn-primary">Escolher</button>
            </div>
          </div>
        </div>

        <div className="card bordered">
          <figure>
            <img src="https://picsum.photos/id/1009/400/250" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Assinatura Mensal</h2>
            <p className="text-xl font-semibold">R$ 11,60/mês</p>
            <div className="card-actions">
              <button className="btn btn-primary">Escolher</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;
