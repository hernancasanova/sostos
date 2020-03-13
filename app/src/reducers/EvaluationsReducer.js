// import asistentes from '../actiontypes/asistentes';
import {
  EVALUATIONS_ADD,
  EVALUATIONS_DELETE,
  EVALUATIONS_UNBIND_QUESTIONS,
  EVALUATIONS_BIND_QUESTIONS
} from '../actiontypes/evaluations';

const INITIAL_STATE = [
  {
    id: 1,
    name: 'Álgebra: Prueba Parcial 1',
    questions: [1],
    topics: 'Teoría de Conjuntos, Funciones',
    institution: 1
  },
  {
    id: 2,
    name: 'Álgebra: Prueba Parcial 2',
    questions: [1, 2],
    topics: 'Dominio y Recorrido, Inyectividad y Biyectividad',
    institution: 1
  },
  {
    id: 3,
    name: 'Álgebra: Examen',
    questions: [],
    topics: 'Teoría de Conjuntos, Functiones, Dominio y Recorrido, ...',
    institution: 2
  },
  {
    id: 4,
    name: 'Prueba de Admisión Matemática 8° Básico 2014',
    questions: [
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33
    ],
    topics: 'Teoría de Conjuntos, Functiones, Dominio y Recorrido, ...',
    institution: 1
  }
];

export default (state = INITIAL_STATE, action) => {
  const { type, evaluation, questions, evaluations } = action;
  switch (type) {
    case EVALUATIONS_ADD:
      evaluation.questions = [];
      evaluation.id = state.length + 1;
      state.push(evaluation);
      return state;
    case EVALUATIONS_DELETE:
      return state.filter(evalS => evaluations.indexOf(evalS.id) === -1);
    case EVALUATIONS_UNBIND_QUESTIONS:
      evaluation.questions = evaluation.questions.filter(
        itemList => questions.indexOf(itemList) === -1
      );
      return state;
    case EVALUATIONS_BIND_QUESTIONS:
      evaluation.questions = evaluation.questions.concat(questions);
      return state;
    default:
      return state;
  }
};
