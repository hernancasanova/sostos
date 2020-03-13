import { TOPICS_ADD, TOPICS_DELETE, TOPICS_EDIT } from '../actiontypes/topics';

const INITIAL_STATE = [
  {
    id: 1,
    name: 'Matemática 1° básico',
    description:
      'El propósito de esta asignatura es enriquecer la comprensión de la realidad, facilitar la selección de estrategias para resolver problemas y contribuir al desarrollo del pensamiento crítico y autónomo en todos los estudiantes.',
    subtopics: [
      {
        id: 1,
        name: 'Unidad 1: Conocer hasta el numero 50',
        objectives: [1, 3, 4, 6, 11, 16, 17, 2]
      },
      {
        id: 2,
        name: 'Unidad 2: Conocer decenas hasta el número 100',
        objectives: [1, 3, 4, 6, 11, 14, 8, 5]
      },
      {
        id: 3,
        name: 'Unidad 3: Sumar y restar hasta 10',
        objectives: [9, 10, 12, 7, 18, 19]
      },
      {
        id: 4,
        name: 'Unidad 4: Sumar y restar hasta 20',
        objectives: [9, 7, 15, 19, 20]
      }
    ]
  },
  {
    id: 2,
    name: 'Matemática 2° básico',
    description:
      'El propósito de esta asignatura es enriquecer la comprensión de la realidad, facilitar la selección de estrategias para resolver problemas y contribuir al desarrollo del pensamiento crítico y autónomo en todos los estudiantes.',
    objectives: [],
    subtopics: [
      {
        id: 1,
        name: 'Unidad 1: Conocer hasta el numero 500',
        objectives: [21, 22, 23, 25, 26, 27, 29, 37]
      },
      {
        id: 2,
        name: 'Unidad 2: Conocer decenas hasta el número 1.000',
        objectives: [26, 21, 22, 24, 34, 27, 33, 30]
      },
      {
        id: 3,
        name: 'Unidad 3: Geometría, figuras 2D y 3D',
        objectives: [26, 35, 36, 29, 28, 40, 39]
      },
      {
        id: 4,
        name: 'Unidad 4: Pictogramas con escala y gráficos de barra',
        objectives: [26, 38, 41, 42, 32, 31]
      }
    ]
  },
  {
    id: 3,
    name: 'Matemática 3° básico',
    description:
      'El propósito de esta asignatura es enriquecer la comprensión de la realidad, facilitar la selección de estrategias para resolver problemas y contribuir al desarrollo del pensamiento crítico y autónomo en todos los estudiantes.',
    objectives: [],
    subtopics: [
      {
        id: 1,
        name: 'Unidad 1: Sumar y restar hasta 1.000'
      },
      {
        id: 2,
        name: 'Unidad 2: Ecuaciones y figuras 2D y 3D'
      },
      {
        id: 3,
        name: 'Unidad 3: Cálculos mentales'
      },
      {
        id: 4,
        name: 'Unidad 4: Movimiento de figuras 2D'
      }
    ]
  },
  {
    id: 4,
    name: 'Ciencias Naturales 1° básico',
    description:
      'Esta asignatura agrupa a varias disciplinas -la Biología, la Química, la Física, la Botánica, la Geología y la Astronomía- que abordan una amplia variedad de fenómenos naturales: los seres vivos, la materia, la energía y sus transformaciones, el Sistema Solar y la Tierra.',
    objectives: [],
    subtopics: [
      {
        id: 1,
        name: 'Unidad 1: Hábitos saludables y uso de los sentidos'
      },
      {
        id: 2,
        name: 'Unidad 2: Características de los seres vivos'
      },
      {
        id: 3,
        name: 'Unidad 3: Propiedades de materiales y objetos de diverso tipo'
      },
      {
        id: 4,
        name: 'Unidad 4: El Sol y las estaciones del año'
      }
    ]
  },
  {
    id: 5,
    name: 'Ciencias Naturales 2° básico',
    description:
      'Esta asignatura agrupa a varias disciplinas -la Biología, la Química, la Física, la Botánica, la Geología y la Astronomía- que abordan una amplia variedad de fenómenos naturales: los seres vivos, la materia, la energía y sus transformaciones, el Sistema Solar y la Tierra.',
    objectives: [],
    subtopics: [
      {
        id: 1,
        name: 'Unidad 1: Órganos internos del cuerpo humano'
      },
      {
        id: 2,
        name: 'Unidad 2: Animales e invertebrados'
      },
      {
        id: 3,
        name: 'Unidad 3: Actividad humana y medio ambiente'
      },
      {
        id: 4,
        name: 'Unidad 4: El agua y el tiempo atmosférico'
      }
    ]
  },
  {
    id: 6,
    name: 'Ciencias Naturales 3° básico',
    description:
      'Esta asignatura agrupa a varias disciplinas -la Biología, la Química, la Física, la Botánica, la Geología y la Astronomía- que abordan una amplia variedad de fenómenos naturales: los seres vivos, la materia, la energía y sus transformaciones, el Sistema Solar y la Tierra.',
    objectives: [],
    subtopics: [
      {
        id: 1,
        name: 'Unidad 1: La luz y el sonido'
      },
      {
        id: 2,
        name: 'Unidad 2: El Sistema solar'
      },
      {
        id: 3,
        name: 'Unidad 3: Importancia de las plantas'
      },
      {
        id: 4,
        name: 'Unidad 4: Vida saludable'
      }
    ]
  },
  {
    id: 7,
    name: 'Lenguaje, Comunicación y Literatura 1° básico',
    description:
      'Su objetivo es que los alumnos adquieran las habilidades comunicativas que son indispensables para desenvolverse en el mundo y para integrarse en una sociedad democrática de manera activa e informada.',
    objectives: [],
    subtopics: [
      {
        id: 1,
        name: 'Unidad 1: Comenzando a leer y escribir'
      },
      {
        id: 2,
        name: 'Unidad 2: Leer y comprender'
      },
      {
        id: 3,
        name: 'Unidad 3: Ejercitar lectura, escritura y expresión oral'
      },
      {
        id: 4,
        name: 'Unidad 4: Consolidar lectura y escritura'
      }
    ]
  }
];

export default (state = INITIAL_STATE, action) => {
  const { type, topics, topic } = action;
  const stateItem =
    typeof topic === 'undefined'
      ? false
      : state.find(singleStateItem => singleStateItem.id === topic.id);
  switch (type) {
    case TOPICS_ADD:
      // topic.attendees = 0;
      topic.id = state.length + 1;
      state.push(topic);
      return state;
    case TOPICS_DELETE:
      return state.filter(topicS => topics.indexOf(topicS.id) === -1);
    case TOPICS_EDIT:
      Object.keys(topic).forEach(propName => {
        stateItem[propName] = topic[propName];
      });
      return state;
    default:
      return state;
  }
};
