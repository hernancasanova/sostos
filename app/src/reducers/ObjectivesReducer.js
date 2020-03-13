import { OBJECTIVES_DELETE, OBJECTIVES_ADD, OBJECTIVES_EDIT } from '../actiontypes/objectives';

const INITIAL_STATE = [
  // #region Objetivos Primera Unidad
  {
    id: 1,
    name: 'MA01 OA 01',
    description:
      'Contar números del 0 al 100 de 1 en 1, de 2 en 2, de 5 en 5 y de 10 en 10, hacia adelante y hacia atrás, empezando por cualquier número menor que 100.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: [1]
  },
  {
    id: 2,
    name: 'MA01 OA 02',
    description:
      'Identificar el orden de los elementos de una serie, utilizando números ordinales del primero (1º) al décimo (10º).',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: [1, 2]
  },
  {
    id: 3,
    name: 'MA01 OA 03',
    description:
      'Leer números del 0 al 20 y representarlos en forma concreta, pictórica y simbólica.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 4,
    name: 'MA01 OA 04',
    description:
      'Comparar y ordenar números del 0 al 20 de menor a mayor y/o viceversa, utilizando material concreto y/o usando software educativo.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 5,
    name: 'MA01 OA 05',
    description: 'Estimar cantidades hasta 20 en situaciones concretas, usando un referente.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 6,
    name: 'MA01 OA 06',
    description:
      'Componer y descomponer números del 0 a 20 de manera aditiva, en forma concreta, pictórica y simbólica.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 7,
    name: 'MA01 OA 07',
    description:
      'Describir y aplicar estrategias de cálculo mental para las adiciones y sustracciones hasta 20: conteo hacia adelante y atrás, completar 10, dobles.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 8,
    name: 'MA01 OA 08',
    description:
      'Determinar las unidades y decenas en números del 0 al 20, agrupando de a 10, de manera concreta, pictórica y simbólica.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 9,
    name: 'MA01 OA 09',
    description:
      'Demostrar que comprenden la adición y la sustracción de números del 0 al 20 progresivamente, de 0 a 5, de 6 a 10, de 11 a 20 con dos sumandos: usando un lenguaje cotidiano para describir acciones desde su propia experiencia; representando adiciones y sustracciones con material concreto y pictórico, de manera manual y/o usando software educativo; representando el proceso en forma simbólica; resolviendo problemas en contextos familiares; creando problemas matemáticos y resolviéndolos.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 10,
    name: 'MA01 OA 10',
    description:
      'Demostrar que la adición y la sustracción son operaciones inversas, de manera concreta, pictórica y simbólica.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 11,
    name: 'MA01 OA 11',
    description:
      'Reconocer, describir, crear y continuar patrones repetitivos (sonidos, figuras, ritmos...) y patrones numéricos hasta el 20, crecientes y decrecientes, usando material concreto, pictórico y simbólico, de manera manual y/o por medio de software educativo.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 12,
    name: 'MA01 OA 12',
    description:
      'Describir y registrar la igualdad y la desigualdad como equilibrio y desequilibrio, usando una balanza en forma concreta, pictórica y simbólica del 0 al 20, usando el símbolo igual (=).',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 13,
    name: 'MA01 OA 13',
    description:
      'Describir la posición de objetos y personas en relación a sí mismos y a otros objetos y personas, usando un lenguaje común (como derecha e izquierda).',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 14,
    name: 'MA01 OA 14',
    description:
      'Identificar en el entorno figuras 3D y figuras 2D y relacionarlas, usando material concreto.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 15,
    name: 'MA01 OA 15',
    description: 'Identificar y dibujar líneas rectas y curvas.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 16,
    name: 'MA01 OA 16',
    description:
      'Usar unidades no estandarizadas de tiempo para comparar la duración de eventos cotidianos.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 17,
    name: 'MA01 OA 17',
    description:
      'Usar un lenguaje cotidiano para secuenciar eventos en el tiempo: días de la semana, meses del año y algunas fechas significativas.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 18,
    name: 'MA01 OA 18',
    description:
      'Identificar y comparar la longitud de objetos, usando palabras como largo y corto.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 19,
    name: 'MA01 OA 19',
    description:
      'Recolectar y registrar datos para responder preguntas estadísticas sobre sí mismo y el entorno, usando bloques, tablas de conteo y pictogramas.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 20,
    name: 'MA01 OA 20',
    description: 'Construir, leer e interpretar pictogramas.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  // #endregion
  // #region Objetivos Segunda Unidad
  {
    id: 21,
    name: 'MA02 OA 01',
    description:
      'Contar números del 0 al 1 000 de 2 en 2, de 5 en 5, de 10 en 10 y de 100 en 100, hacia adelante y hacia atrás, empezando por cualquier número menor que 1 000.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 22,
    name: 'MA02 OA 02',
    description:
      'Leer números del 0 al 100 y representarlos en forma concreta, pictórica y simbólica.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 23,
    name: 'MA02 OA 03',
    description:
      'Comparar y ordenar números del 0 al 100 de menor a mayor y viceversa, usando material concreto y monedas nacionales de manera manual y/o por medio de software educativo.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 24,
    name: 'MA02 OA 04',
    description: 'Estimar cantidades hasta 100 en situaciones concretas, usando un referente.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 25,
    name: 'MA02 OA 05',
    description:
      'Componer y descomponer números del 0 a 100 de manera aditiva, en forma concreta, pictórica y simbólica.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 26,
    name: 'MA02 OA 06',
    description:
      'Describir y aplicar estrategias de cálculo mental para adiciones y sustracciones hasta 20: completar 10; usar dobles y mitades; "uno más uno menos"; "dos más dos menos"; usar la reversibilidad de las operaciones.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 27,
    name: 'MA02 OA 07',
    description:
      'Identificar las unidades y decenas en números del 0 al 100, representando las cantidades de acuerdo a su valor posicional, con material concreto, pictórico y simbólico.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 28,
    name: 'MA02 OA 08',
    description:
      'Demostrar y explicar de manera concreta, pictórica y simbólica el efecto de sumar y restar 0 a un número.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 29,
    name: 'MA02 OA 09',
    description:
      'Demostrar que comprende la adición y la sustracción en el ámbito del 0 al 100: usando un lenguaje cotidiano y matemático para describir acciones desde su propia experiencia; resolviendo problemas con una variedad de representaciones concretas y pictóricas, de manera manual y/o usando software educativo; registrando el proceso en forma simbólica; aplicando los resultados de las adiciones y sustracciones de los números del 0 a 20 sin realizar cálculos; aplicando el algoritmo de la adición y sustracción sin considerar reserva; creando problemas matemáticos en contextos familiares y resolviéndolos.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 30,
    name: 'MA02 OA 10',
    description:
      'Demostrar que comprende la relación entre la adición y la sustracción al usar la "familia de operaciones" en cálculos aritméticos y la resolución de problemas.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 31,
    name: 'MA02 OA 11',
    description:
      'Demostrar que comprende la multiplicación: usando representaciones concretas y pictóricas; expresando una multiplicación como una adición de sumandos iguales; usando la distributividad como estrategia para construir las tablas del 2, del 5 y del 10; resolviendo problemas que involucren las tablas del 2, del 5 y del 10.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 32,
    name: 'MA02 OA 12',
    description:
      'Crear, representar y continuar una variedad de patrones numéricos y completar los elementos faltantes, de manera manual y/o usando software educativo.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 33,
    name: 'MA02 OA 13',
    description:
      'Demostrar, explicar y registrar la igualdad y la desigualdad en forma concreta y pictórica del 0 al 20, usando el símbolo igual (=) y los símbolos no igual (>, <).',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 34,
    name: 'MA02 OA 14',
    description:
      'Representar y describir la posición de objetos y personas en relación a sí mismos y a otros objetos y personas, incluyendo derecha e izquierda y usando material concreto y dibujos.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 35,
    name: 'MA02 OA 15',
    description:
      'Describir, comparar y construir figuras 2D (triángulos, cuadrados, rectángulos y círculos) con material concreto.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 36,
    name: 'MA02 OA 16',
    description:
      'Describir, comparar y construir figuras 3D (cubos, paralelepípedos, esferas y conos) con diversos materiales.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 37,
    name: 'MA02 OA 17',
    description: 'Identificar días, semanas, meses y fechas en el calendario.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 38,
    name: 'MA02 OA 18',
    description:
      'Leer horas y medias horas en relojes digitales, en el contexto de la resolución de problemas.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 39,
    name: 'MA02 OA 19',
    description:
      'Determinar la longitud de objetos, usando unidades de medidas no estandarizadas y unidades estandarizadas (cm y m), en el contexto de la resolución de problemas.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 40,
    name: 'MA02 OA 20',
    description:
      'Recolectar y registrar datos para responder preguntas estadísticas sobre juegos con monedas y dados, usando bloques y tablas de conteo y pictogramas.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 41,
    name: 'MA02 OA 21',
    description:
      'Registrar en tablas y gráficos de barra simple, resultados de juegos aleatorios con dados y monedas.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  },
  {
    id: 42,
    name: 'MA02 OA 22',
    description: 'Construir, leer e interpretar pictogramas con escala y gráficos de barra simple.',
    requirements: '',
    keyWords: '',
    concepts: '',
    repositories: []
  }
  //
];

export default (state = INITIAL_STATE, action) => {
  const { objective, objectives } = action;
  switch (action.type) {
    case OBJECTIVES_ADD:
      objective.id = state.length + 1;
      return [...state, objective];
    case OBJECTIVES_DELETE:
      return state.filter(objectiveS => objectives.indexOf(objectiveS.id) === -1);
    case OBJECTIVES_EDIT:
      return state.map(objectiveMap =>
        objectiveMap.id === objective.id ? objective : objectiveMap
      );
    default:
      return state;
  }
};
