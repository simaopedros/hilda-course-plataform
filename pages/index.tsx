import React from 'react';
import CourseList from '@/components/course/CourseList';
import Testimonial from '@/components/testimonial/Testimonial';
import Course from '@/types/Course';




const coursos = [] as Course[]; // IRA CARREGAR A LISTAGEM DE CURSOS DA HOME PAGE



console.log("Aqui" + coursos.length)
function HomePage() {
  return (
    <div>

      <section className="hero">
        <div className="container mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold mb-2">
            Aprenda com os melhores cursos online
          </h2>
          <h3 className="text-2xl mb-8">
            Junte-se à nossa plataforma e comece sua jornada de aprendizado hoje mesmo.
          </h3>
          <button className="btn btn-primary">Inscreva-se agora</button>
        </div>
      </section>
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-10">Cursos em Destaque</h2>
        <CourseList courses={[]}  /> 
      </section>
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-10">Depoimentos</h2>
        <Testimonial
          name="Aluno Satisfeito"
          testimonial="Este é o melhor lugar para aprender. Os instrutores são incríveis e o conteúdo do curso é de alta qualidade. Eu recomendo!"
          imageUrl='https://picsum.photos/200/300' />

        <Testimonial
          name="Aluno Satisfeito"
          testimonial="Este é o melhor lugar para aprender. Os instrutores são incríveis e o conteúdo do curso é de alta qualidade. Eu recomendo!"
          imageUrl='https://picsum.photos/200/300' />
        {/* Adicione mais depoimentos conforme necessário */}
      </section>
      <section className="bg-gray-200 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10">Experimente gratuitamente</h2>
          <p className="text-xl mb-8">
            Ainda não tem certeza? Experimente nossa plataforma gratuitamente e veja como ela pode ajudá-lo a alcançar seus objetivos de aprendizado.
          </p>
          <button className="btn btn-primary">Comece a aprender</button>
        </div>
      </section>

    </div>
  );
}

export default HomePage;
