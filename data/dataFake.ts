import Course from "@/types/Course";


const DataCursos: Course[] = [
    {
        id: "1",
        title: "Introdução à Ciência de Dados",
        description: "Este curso fornece uma introdução completa à Ciência de Dados, incluindo tópicos como coleta e análise de dados, estatística, aprendizado de máquina e visualização de dados.",
        category: "Data Science",
        duration: 40,
        coverImage: "https://example.com/datascience-course-cover.jpg",
        instructorId: 1,
        instructor: {
            id: 1,
            name: "John Doe",
            email: "johndoe@example.com",
            avatarUrl: "https://example.com/johndoe-avatar.jpg",
            expertise: "Data Science"
        },
        price: 199,
        createdAt: new Date("2023-01-01"),
        status: "active",
        requirements: [
            "Conhecimento básico de estatística",
            "Conhecimento básico de programação"
        ],
        completed: false,
        Module: [
            {
                id: 1,
                title: "Coleta de dados",
                description: "Nesta lição, você aprenderá sobre a importância da coleta de dados e como fazê-la de maneira eficiente e eficaz.",
                videoUrl: "6edfa973-86f1-42a3-bb83-a5d51a0cbe2d",
                duration: 10,
                supplementaryMaterial: [
                    {
                        title: "Ebook sobre coleta de dados",
                        link: "https://example.com/datascience-module1-ebook.pdf",
                        formato: "PDF"
                    },
                    {
                        title: "Ferramenta de coleta de dados",
                        link: "https://example.com/datascience-module1-tool.zip",
                        formato: "LINK"
                    }
                ],
                displayOrder: 1,
                moduleId: 1,
                createdAt: new Date("2023-01-01"),
                updatedAt: new Date("2023-01-01"),
                completed: false,
                aulas: [
                    {
                        id: "1",
                        nome: "Coleta de dados primários",
                        descricao: "Nesta aula, você aprenderá sobre a coleta de dados primários e suas vantagens e desvantagens.",
                        duracao: 5,
                        urlAula: "6edfa973-86f1-42a3-bb83-a5d51a0cbe2d",
                        suplementar: [],
                        completed: false
                    },
                    {
                        id: "2",
                        nome: "Coleta de dados secundários",
                        descricao: "Nesta aula, você aprenderá sobre a co",
                        duracao: 5,
                        urlAula: "6edfa973-86f1-42a3-bb83-a5d51a0cbe2d",
                        suplementar: [
                            {
                                title: "Guia de coleta de dados secundários",
                                link: "https://example.com/datascience-module1-aula2-guide.pdf",
                                formato: "LINK"
                            }
                        ],
                        completed: false
                    }
                ]
            },
            {
                id: 2,
                title: "Análise de dados",
                description: "Nesta lição, você aprenderá sobre as técnicas e ferramentas utilizadas para analisar dados.",
                videoUrl: "6edfa973-86f1-42a3-bb83-a5d51a0cbe2d",
                duration: 15,
                supplementaryMaterial: [],
                displayOrder: 2,
                moduleId: 2,
                createdAt: new Date("2023-01-01"),
                updatedAt: new Date("2023-01-01"),
                completed: false,
                aulas: [
                    {
                        id: "3",
                        nome: "Análise exploratória de dados",
                        descricao: "Nesta aula, você aprenderá sobre a análise exploratória de dados e sua importância na Ciência de Dados.",
                        duracao: 5,
                        urlAula: "6edfa973-86f1-42a3-bb83-a5d51a0cbe2d",
                        suplementar: [],
                        completed: false
                    },
                    {
                        id: "4",
                        nome: "Modelagem de dados",
                        descricao: "Nesta aula, você aprenderá sobre a modelagem de dados e como utilizá-la para extrair insights e prever resultados.",
                        duracao: 10,
                        urlAula: "6edfa973-86f1-42a3-bb83-a5d51a0cbe2d",
                        suplementar: [
                            {
                                title: "Guia de modelagem de dados",
                                link: "https://example.com/datascience-module2-aula2-guide.pdf",
                                formato: "PDF"
                            }
                        ],
                        completed: false
                    }
                ]
            }
        ]
    },
    {
        id: "2",
        title: "Desenvolvimento Web com React",
        description: "Este curso ensina os conceitos básicos e avançados do desenvolvimento web utilizando o framework React.",
        category: "Desenvolvimento Web",
        duration: 30,
        coverImage: "https://example.com/webdev-course-cover.jpg",
        instructorId: 2,
        instructor: {
            id: 2,
            name: "Jane Doe",
            email: "janedoe@example.com",
            avatarUrl: "https://example.com/janedoe-avatar.jpg",
            expertise: "Desenvolvimento Web"
        },
        price: 149.99,
        createdAt: new Date("2023-01-01"),
        status: "active",
        requirements: [
            "Conhecimento básico de HTML, CSS e JavaScript",
            "Conhecimento intermediário de programação"
        ],
        completed: false,
        Module: [
            {
                id: 3,
                title: "Introdução ao React",
                description: "Nesta lição, você aprenderá sobre o que é o React e como utilizá-lo para criar aplicações web.",
                videoUrl: "6edfa973-86f1-42a3-bb83-a5d51a0cbe2d",
                duration: 10,
                supplementaryMaterial: [],
                displayOrder: 1,
                moduleId: 3,
                createdAt: new Date("2023-01-01"),
                updatedAt: new Date("2023-01-01"),
                completed: false,
                aulas: [
                    {
                        id: "5",
                        nome: "O que é o React",
                        descricao: "Nesta aula, você aprenderá sobre o que é o React e por que ele é importante para o desenvolvimento web.",
                        duracao: 5,
                        urlAula: "6edfa973-86f1-42a3-bb83-a5d51a0cbe2d",
                        suplementar: [],
                        completed: false
                    },
                    {
                        id: "6",
                        nome: "Instalação e configuração do React",
                        descricao: "Nesta aula, você aprenderá sobre como instalar e configurar o React para criar suas aplicações web.",
                        duracao: 5,
                        urlAula: "6edfa973-86f1-42a3-bb83-a5d51a0cbe2d",
                        suplementar: [
                            {
                                title: "Guia de instalação e configuração do React",
                                link: "https://example.com/webdev-module1-aula2-guide.pdf",
                                formato: "PDF"
                            }
                        ],
                        completed: false
                    }
                ]
            },
            {
                id: 4,
                title: "Desenvolvimento de componentes com React",
                description: "Nesta lição, você aprenderá sobre como criar componentes reutilizáveis com o React.",
                videoUrl: "6edfa973-86f1-42a3-bb83-a5d51a0cbe2d",
                duration: 20,
                supplementaryMaterial: [],
                displayOrder: 2,
                moduleId: 4,
                createdAt: new Date("2023-01-01"),
                updatedAt: new Date("2023-01-02"),
                completed: false,
                aulas: [
                    {
                        id: "7",
                        nome: "Criando componentes simples com React",
                        descricao: "Nesta aula, você aprenderá sobre como criar componentes simples com o React.",
                        duracao: 10,
                        urlAula: "6edfa973-86f1-42a3-bb83-a5d51a0cbe2d",
                        suplementar: [],
                        completed: false
                    },
                    {
                        id: "8",
                        nome: "Criando componentes complexos com React",
                        descricao: "Nesta aula, você aprenderá sobre como criar componentes complexos com o React.",
                        duracao: 10,
                        urlAula: "6edfa973-86f1-42a3-bb83-a5d51a0cbe2d",
                        suplementar: [
                            {
                                title: "Guia de criação de componentes complexos com React",
                                link: "https://example.com/webdev-module2-aula2-guide.pdf",
                                formato: "LINK"
                            }
                        ],
                        completed: false
                    },
                    {
                        id: "8",
                        nome: "Criando componentes complexos com React",
                        descricao: "Nesta aula, você aprenderá sobre como criar componentes complexos com o React.",
                        duracao: 10,
                        urlAula: "6edfa973-86f1-42a3-bb83-a5d51a0cbe2d",
                        suplementar: [

                        ],
                        completed: false
                    },
                    {
                        id: "8",
                        nome: "Criando componentes complexos com React",
                        descricao: "Nesta aula, você aprenderá sobre como criar componentes complexos com o React.",
                        duracao: 10,
                        urlAula: "6edfa973-86f1-42a3-bb83-a5d51a0cbe2d",
                        suplementar: [

                        ],
                        completed: false
                    }
                ]
            }
        ]
    }





]


export default DataCursos;