import { QUESTIONS_DELETE, QUESTIONS_ADD, QUESTIONS_EDIT } from '../actiontypes/questions';

// #region Image
const image =
  'data:image/png;base64,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';
// #endregion

const INITIAL_STATE = [
  {
    code: 'MAT-001',
    // title: '¿Cuanto es 2 + 2?',
    title:
      '<math xmlns="http://www.w3.org/1998/Math/MathML"><mo>&#xBF;</mo><mi>E</mi><mi>s</mi><mo>&#xA0;</mo><msup><mfenced><mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow></mfenced><mn>2</mn></msup><mo>&#xA0;</mo><mi>i</mi><mi>g</mi><mi>u</mi><mi>a</mi><mi>l</mi><mo>&#xA0;</mo><mi>a</mi><mo>&#xA0;</mo><msup><mi>a</mi><mn>2</mn></msup><mo>+</mo><msup><mi>b</mi><mn>2</mn></msup><mo>?</mo></math>',
    type: 'mathtype',
    description: '',
    alternatives: [
      { id: 0, correct: true, text: '4', image, alignment: 'left' },
      { id: 1, correct: false, text: '3', image, alignment: 'middle' },
      { id: 2, correct: false, text: '22', image, alignment: 'right' }
    ],
    image,
    alignment: 'right',
    id: 1,
    difficulty: 1,
    topic: 1,
    subtopic: 1
  },
  {
    code: 'MAT-002',
    title:
      '<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>x</mi><mo>&#xA0;</mo><mo>=</mo><mfrac><mrow><mo>-</mo><mi>b</mi><mo>&#xA0;</mo><mo>&#xB1;</mo><mo>&#xA0;</mo><msqrt><msup><mi>b</mi><mn>2</mn></msup><mo>-</mo><mn>4</mn><mi>a</mi><mi>c</mi></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></math>',
    description: '',
    type: 'mathtype',
    alternatives: [
      { id: 0, correct: false, text: '31' },
      { id: 1, correct: true, text: '4' },
      { id: 2, correct: false, text: '13' }
    ],
    id: 2,
    difficulty: 0,
    topic: 1,
    subtopic: 1
  },
  {
    code: 'ALG-001',
    title: '¿Qué tipo de número es -6?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: 'Un número natural'
      },
      {
        id: 1,
        correct: false,
        text: 'No es un número entero'
      },
      {
        id: 2,
        correct: false,
        text: 'Un número natural negativo'
      },
      {
        id: 3,
        correct: true,
        text: 'Un número entero negativo'
      }
    ],
    id: 3,
    difficulty: -1,
    topic: 1,
    subtopic: 2
  },
  {
    code: 'ALG-002',
    title:
      '¿Cuál de las siguientes afirmaciones es correcta respecto del conjunto de los números enteros?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: 'Contiene solo en número cero'
      },
      {
        id: 1,
        correct: false,
        text: 'Tiene solo números positivos'
      },
      {
        id: 2,
        correct: false,
        text: 'Tiene solo números negativos'
      },
      {
        id: 3,
        correct: true,
        text: 'Contiene números negativos, el cero y números negativos'
      }
    ],
    id: 4,
    difficulty: 0,
    topic: 1
  },
  {
    code: 'ALG-003',
    title: '¿Cuál de los siguientes valores es mayor?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '-1'
      },
      {
        id: 1,
        correct: false,
        text: '-3'
      },
      {
        id: 2,
        correct: false,
        text: '-5'
      },
      {
        id: 3,
        correct: true,
        text: '0'
      }
    ],
    id: 5,
    difficulty: 1,
    topic: 1
  },
  {
    code: 'ALG-004',
    title: '¿Qué grupo tiene sus números ordenados de menor a mayor?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '-1; -3; -5; -7; -9; -10'
      },
      {
        id: 1,
        correct: false,
        text: '0; -1; 1; -2; 2; -3; 3'
      },
      {
        id: 2,
        correct: false,
        text: '-5; 2; -1; 0; 1; 4; 7'
      },
      {
        id: 3,
        correct: true,
        text: '-3; -1; 1; 3; 5; 7'
      }
    ],
    id: 6,
    difficulty: 1,
    topic: 2,
    subtopic: 2
  },
  {
    code: 'ALG-005',
    title: '¿Qué valor es más cercano a cero?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '-15'
      },
      {
        id: 1,
        correct: true,
        text: '-8'
      },
      {
        id: 2,
        correct: false,
        text: '-9'
      },
      {
        id: 3,
        correct: false,
        text: '15'
      }
    ],
    id: 7,
    difficulty: 0,
    topic: 2
  },
  {
    code: 'ALG-006',
    title: '¿Cuál de las siguientes expresiones es VERDADERA?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '|−3| < −3'
      },
      {
        id: 1,
        correct: true,
        text: '|−3| = |3|'
      },
      {
        id: 2,
        correct: false,
        text: '|−3| < |3|'
      },
      {
        id: 3,
        correct: false,
        text: '−|−3| < 3'
      }
    ],
    id: 8,
    difficulty: 0,
    topic: 3
  },
  {
    code: 'ALG-007',
    title: '¿Cuál es el resultados de |−5| + |−5|?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '-10'
      },
      {
        id: 1,
        correct: false,
        text: '-5'
      },
      {
        id: 2,
        correct: false,
        text: '0'
      },
      {
        id: 3,
        correct: true,
        text: '10'
      }
    ],
    id: 9,
    difficulty: 0,
    topic: 2
  },
  {
    code: 'ALG-008',
    title: 'Si  x = −5; y = 2; z = −3, ¿Cuál de la siguientes expresiones es VERDADERA?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: 'x + y < z'
      },
      {
        id: 1,
        correct: false,
        text: 'x - y > z'
      },
      {
        id: 2,
        correct: false,
        text: 'y + z < x'
      },
      {
        id: 3,
        correct: true,
        text: 'z < y - x'
      }
    ],
    id: 10,
    difficulty: 1,
    topic: 3
  },
  {
    code: 'ALG-009',
    title: '¿Cuál es el resultado de −3 + 5 − 7 ?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '5'
      },
      {
        id: 1,
        correct: false,
        text: '-15'
      },
      {
        id: 2,
        correct: true,
        text: '-5'
      },
      {
        id: 3,
        correct: false,
        text: '-1'
      }
    ],
    id: 11,
    difficulty: -1,
    topic: 3
  },
  {
    code: 'ALG-010',
    title: '¿Cuál es el resultado de −(−3) + (−5)?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '-8'
      },
      {
        id: 1,
        correct: true,
        text: '-2'
      },
      {
        id: 2,
        correct: false,
        text: '2'
      },
      {
        id: 3,
        correct: false,
        text: '8'
      }
    ],
    id: 12,
    difficulty: -1,
    topic: 1
  },
  {
    code: 'ALG-011',
    title: '¿Qué valor obtienes al multiplicar -7 y -1?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: true,
        text: '7'
      },
      {
        id: 1,
        correct: false,
        text: '-6'
      },
      {
        id: 2,
        correct: false,
        text: '-7'
      },
      {
        id: 3,
        correct: false,
        text: '-8'
      }
    ],
    id: 13,
    difficulty: -1,
    topic: 1
  },
  {
    code: 'ALG-012',
    title: '¿Cuál es el valor de la expresión 2 ∙ 3 + −10?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '-14'
      },
      {
        id: 1,
        correct: false,
        text: '-8'
      },
      {
        id: 2,
        correct: true,
        text: '-4'
      },
      {
        id: 3,
        correct: false,
        text: '16'
      }
    ],
    id: 14,
    difficulty: 0,
    topic: 1
  },
  {
    code: 'ALG-013',
    title: '¿Cuál es el resultado de 4 + 20 : 2 − 30?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '-18'
      },
      {
        id: 1,
        correct: true,
        text: '-16'
      },
      {
        id: 2,
        correct: false,
        text: '12'
      },
      {
        id: 3,
        correct: false,
        text: '44'
      }
    ],
    id: 15,
    difficulty: -1,
    topic: 1
  },
  {
    code: 'ALG-014',
    title: '¿Cuál es el SUCESOR del resultado de 2 − [4 ∙ 5 : (−2)]?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '11'
      },
      {
        id: 1,
        correct: false,
        text: '12'
      },
      {
        id: 2,
        correct: true,
        text: '13'
      },
      {
        id: 3,
        correct: false,
        text: '14'
      }
    ],
    id: 16,
    difficulty: 0,
    topic: 1
  },
  {
    code: 'ALG-015',
    title: '¿Cuál es el inverso MULTIPLICATIVO de 4?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '4'
      },
      {
        id: 1,
        correct: false,
        text: '- 1/4'
      },
      {
        id: 2,
        correct: false,
        text: '-4'
      },
      {
        id: 3,
        correct: true,
        text: '1/4'
      }
    ],
    id: 17,
    difficulty: -1,
    topic: 1
  },
  {
    code: 'ALG-016',
    title:
      'Si la temperatura máxima de un día fue 22°C y la mínima -7 °C, ¿Cuál fue la diferencia de temperaturas durante ese día?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '-25 °C'
      },
      {
        id: 1,
        correct: false,
        text: '-11 °C'
      },
      {
        id: 2,
        correct: false,
        text: '11 °C'
      },
      {
        id: 3,
        correct: true,
        text: '29 °C'
      }
    ],
    id: 18,
    difficulty: 1,
    topic: 1
  },
  {
    code: 'ALG-017',
    title:
      'El buzo A se ubica a -13 metros respecto del nivel del mar; el buzo B a -10 metros; el buzo C a -4 metros, y el buzo D a -2 metros. ¿Cuál de ellos está más cerca de un pez ubicado a -8 metros?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: 'Buzo A'
      },
      {
        id: 1,
        correct: true,
        text: 'Buzo B'
      },
      {
        id: 2,
        correct: false,
        text: 'Buzo C'
      },
      {
        id: 3,
        correct: false,
        text: 'Buzo D'
      }
    ],
    id: 19,
    difficulty: 1,
    topic: 1
  },
  {
    code: 'ALG-018',
    title: '¿Cuál es el valor de 5 elevado a 3?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '15'
      },
      {
        id: 1,
        correct: false,
        text: '25'
      },
      {
        id: 2,
        correct: false,
        text: '100'
      },
      {
        id: 3,
        correct: true,
        text: '125'
      }
    ],
    id: 20,
    difficulty: -1,
    topic: 1
  },
  {
    code: 'ALG-019',
    title: '¿Cuál de las siguientes expresiones corresponde a la potencia 3⁴?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '4 ∙ 4 ∙ 4'
      },
      {
        id: 1,
        correct: false,
        text: '4 + 4 + 4'
      },
      {
        id: 2,
        correct: true,
        text: '3 ∙ 3 ∙ 3 ∙ 3'
      },
      {
        id: 3,
        correct: false,
        text: '3 + 3 + 3 + 3'
      }
    ],
    id: 21,
    difficulty: 0,
    topic: 1
  },
  {
    code: 'ALG-020',
    title: 'Si la base de una potencia es 4, ¿Cuál es el exponente para que su valor sea 256?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '3'
      },
      {
        id: 1,
        correct: true,
        text: '4'
      },
      {
        id: 2,
        correct: false,
        text: '5'
      },
      {
        id: 3,
        correct: false,
        text: '6'
      }
    ],
    id: 22,
    difficulty: 0,
    topic: 1
  },
  {
    code: 'ALG-021',
    title: 'Si el exponente de una potencia es 4, ¿Cuál es la base para que su valor sea 81?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: true,
        text: '3'
      },
      {
        id: 1,
        correct: false,
        text: '6'
      },
      {
        id: 2,
        correct: false,
        text: '7'
      },
      {
        id: 3,
        correct: false,
        text: '9'
      }
    ],
    id: 23,
    difficulty: 0,
    topic: 1
  },
  {
    code: 'ALG-022',
    title: '¿Cuál de las siguientes afirmaciones es FALSA?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '1 elevado a 10 = 1'
      },
      {
        id: 1,
        correct: false,
        text: '2² = 2 * 2'
      },
      {
        id: 2,
        correct: false,
        text: '3 elevado a 3 = 3 ∙ 3 ∙ 3'
      },
      {
        id: 3,
        correct: true,
        text: '3 elevado a 1 ∙ 3 elevado a 1 = 3 + 3'
      }
    ],
    id: 24,
    difficulty: 1,
    topic: 1
  },
  {
    code: 'ALG-023',
    title: 'Al resolver 2 * 2⁵ * 2⁶:',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '2¹⁰'
      },
      {
        id: 1,
        correct: false,
        text: '2¹¹'
      },
      {
        id: 2,
        correct: true,
        text: '2¹²'
      },
      {
        id: 3,
        correct: false,
        text: '21²⁰'
      }
    ],
    id: 25,
    difficulty: 0,
    topic: 1
  },
  {
    code: 'ALG-024',
    title: '¿Cuál es el área del siguiente rectángulo?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '11 elevado a 3 cm2'
      },
      {
        id: 1,
        correct: true,
        text: '30 elevado a 3 cm2'
      },
      {
        id: 2,
        correct: false,
        text: '30 elevado a 6 cm2'
      },
      {
        id: 3,
        correct: false,
        text: '30 elevado a 9 cm2'
      }
    ],
    id: 26,
    difficulty: -1,
    topic: 1
  },
  {
    code: 'ALG-025',
    title:
      'A María José le encargaron comprar las 2⁴ entradas a un recital, para ella y sus amigas, las que tenían un valor de $13 elevado a 4 cada una. ¿Cuánto dinero gastó en las entradas?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '$26¹⁶'
      },
      {
        id: 1,
        correct: false,
        text: '$26⁸'
      },
      {
        id: 2,
        correct: true,
        text: '$26⁴'
      },
      {
        id: 3,
        correct: false,
        text: '$15⁴'
      }
    ],
    id: 27,
    difficulty: 0,
    topic: 1
  },
  {
    code: 'ALG-026',
    title: '¿Cuál es el valor de la expresión 144² : 36²?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '2'
      },
      {
        id: 1,
        correct: false,
        text: '4'
      },
      {
        id: 2,
        correct: false,
        text: '8'
      },
      {
        id: 3,
        correct: true,
        text: '16'
      }
    ],
    id: 28,
    difficulty: 0,
    topic: 1
  },
  {
    code: 'ALG-027',
    title: '¿Cuál es área de un cuadrado cuyo lado mide 7⁴ cm?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '7 cm2'
      },
      {
        id: 1,
        correct: false,
        text: '7 elevado a 2 cm2'
      },
      {
        id: 2,
        correct: true,
        text: '7 elevado a 8 cm2'
      },
      {
        id: 3,
        correct: false,
        text: '7 elevado a 16 cm2'
      }
    ],
    id: 29,
    difficulty: -1,
    topic: 1
  },
  {
    code: 'ALG-028',
    title: '¿Cuál es el volumen del cubo de la figura?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '64 cm3'
      },
      {
        id: 1,
        correct: false,
        text: '8 elevado a 5 cm3'
      },
      {
        id: 2,
        correct: true,
        text: '8 elevado a 6 cm3'
      },
      {
        id: 3,
        correct: false,
        text: '8 elevado a 8 cm3'
      }
    ],
    id: 30,
    difficulty: 0,
    topic: 1
  },
  {
    code: 'ALG-029',
    title:
      'Un año luz es la distancia que recorre la luz en un año y equivale a 9,4605 * 10 elevado a 12 km aproximadamente. De acuerdo a esta afirmación. ¿Cuál de las siguientes alternativas representa un año luz?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '9.460.500.000 km'
      },
      {
        id: 1,
        correct: false,
        text: '9.460.000.000.000 km'
      },
      {
        id: 2,
        correct: true,
        text: '9.460.500.000.000 km'
      },
      {
        id: 3,
        correct: false,
        text: '94.605.000.000.000.000'
      }
    ],
    id: 31,
    difficulty: 1,
    topic: 1
  },
  {
    code: 'ALG-030',
    title: 'En la siguiente igualdad, ¿cuál es el valor de x?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: true,
        text: '4,8'
      },
      {
        id: 1,
        correct: false,
        text: '11,5'
      },
      {
        id: 2,
        correct: false,
        text: '476'
      },
      {
        id: 3,
        correct: false,
        text: '529'
      }
    ],
    id: 32,
    difficulty: -1,
    topic: 1
  },
  {
    code: 'ALG-031',
    title: '¿Cuál es el perímetro del siguiente polígono?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '105 cm'
      },
      {
        id: 1,
        correct: true,
        text: '115 cm'
      },
      {
        id: 2,
        correct: false,
        text: '121 cm'
      },
      {
        id: 3,
        correct: false,
        text: '213 cm'
      }
    ],
    id: 33,
    difficulty: -1,
    topic: 1
  },
  {
    code: 'ALG-032',
    title:
      '¿Cuál de las siguientes medidas corresponden a las medidas de los lados de un triángulo rectángulo?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '5 cm, 6 cm y 14 cm'
      },
      {
        id: 1,
        correct: true,
        text: '6 cm, 8 cm y 20 cm'
      },
      {
        id: 2,
        correct: false,
        text: '5 cm, 12 cm y 13 cm'
      },
      {
        id: 3,
        correct: false,
        text: '3 cm, 14 cm y 18 cm'
      }
    ],
    id: 34,
    difficulty: 1,
    topic: 1
  },
  {
    code: 'ALG-033',
    title:
      '¿Cuál de las siguientes medidas no se podría utilizar para construir un triángulo si las medidas de dos de sus lados son 6 cm y 8 cm?',
    description: '',
    alternatives: [
      {
        id: 0,
        correct: false,
        text: '3 cm'
      },
      {
        id: 1,
        correct: true,
        text: '4 cm'
      },
      {
        id: 2,
        correct: false,
        text: '5 cm'
      },
      {
        id: 3,
        correct: false,
        text: '15 cm'
      }
    ],
    id: 35,
    difficulty: 1,
    topic: 1
  }
];

export default (state = INITIAL_STATE, action) => {
  const { question, questions } = action;
  const stateItem =
    typeof question === 'undefined'
      ? false
      : state.find(singleStateItem => singleStateItem.id === question.id);
  switch (action.type) {
    case QUESTIONS_ADD:
      question.id = state.length + 1;
      return [...state, question];
    case QUESTIONS_DELETE:
      return state.filter(questionS => questions.indexOf(questionS.id) === -1);
    case QUESTIONS_EDIT:
      Object.keys(question).forEach(propName => {
        stateItem[propName] = question[propName];
      });
      return state;
    default:
      return state;
  }
};
