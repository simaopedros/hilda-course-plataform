// components/footer/Footer.tsx
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
<>
  <footer className="footer p-10 bg-base-200 text-base-content">
    <div>
      <span className="footer-title">Cursos</span>
      <Link href="/courses" className="link link-hover">Todos os cursos</Link>
      <Link href="/instructors" className="link link-hover">Instrutores</Link>
    </div>
    <div>
      <span className="footer-title">Empresa</span>
      <Link href="/about" className="link link-hover">Sobre nós</Link>
      <Link href="/contact" className="link link-hover">Contato</Link>
    </div>
    <div>
      <span className="footer-title">Legal</span>
      <Link href="/terms" className="link link-hover">Termos de uso</Link>
      <Link href="/privacy" className="link link-hover">Política de privacidade</Link>
    </div>
  </footer>
  <footer className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
    <div className="items-center grid-flow-col">
      <p>
        SuaMarca Ltda. <br />
        Transformando educação desde 2023
      </p>
    </div>
    <div className="md:place-self-center md:justify-self-end">
      <div className="grid grid-flow-col gap-4">
        {/* Coloque os ícones das redes sociais aqui */}
      </div>
    </div>
  </footer>
</>

  );
};

export default Footer;
