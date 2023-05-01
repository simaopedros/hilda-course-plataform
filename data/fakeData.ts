// fakeData.ts

export const fetchedLesson = {
    id: '1',
    nome: 'Aula 1 - Introdução',
    descricao: 'Nesta aula, vamos aprender os fundamentos básicos.',
    duracao: 25,
    urlAula: '6edfa973-86f1-42a3-bb83-a5d51a0cbe2d',
    suplementar: [
      {
        title: 'Material de apoio',
        link: 'https://example.com/material.pdf',
        formato: 'pdf'
      }
    ]
  };
  
  export const fetchedCourse = {
    id: '1',
    title: 'Curso de exemplo',
    description: 'Aprenda os conceitos básicos neste curso de exemplo.',
    modules: [
      {
        id: '1',
        title: 'Módulo 1 - Introdução',
        lessons: [fetchedLesson]
      },
      {
        id: '2',
        title: 'Módulo 2 - Conceitos avançados',
        lessons: []
      }
    ]
  };
  