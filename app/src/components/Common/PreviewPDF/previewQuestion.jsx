import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { validateQuestion } from '../../../validators';
import PreviewAlternative from './previewAlternative';
import { mathMLToUrl } from '../../../utils/formulas';

const ALIGNMENTS = {
  LEFT: 'left',
  MIDDLE: 'middle',
  RIGHT: 'right'
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    textAlign: 'left',
    // fontFamily: 'Oswald',
    marginLeft: 48,
    marginRight: 48,
    marginTop: 32
  },
  imageTitleFormula: {
    // width: '150px',
    width: 150,
    marginTop: -15,
    marginBottom: 5,
    marginLeft: 80,
    marginRight: 'auto'
  },
  imageLeft: {
    height: '100px',
    marginLeft: 80,
    marginRight: 'auto'
  },
  imageMiddle: {
    height: '100px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  imageRight: {
    height: '100px',
    marginLeft: 'auto',
    marginRight: 80
  }
});

function imageStyle(aligment) {
  switch (aligment) {
    case ALIGNMENTS.LEFT:
      return styles.imageLeft;
    case ALIGNMENTS.MIDDLE:
      return styles.imageMiddle;
    case ALIGNMENTS.RIGHT:
      return styles.imageRight;
    default:
      return styles.imageMiddle;
  }
}

const PreviewQuestion = props => {
  const { question, index } = props;
  const { title, alternatives, image, alignment, type } = question;
  if (type === 'mathtype') {
    console.log(mathMLToUrl(title));
  }
  return (
    <React.Fragment>
      {(type === 'plaintext' || typeof type === 'undefined') && (
        <Text style={styles.title}>{`${index + 1}.- ${title}`}</Text>
      )}
      {type === 'mathtype' && (
        <View>
          <Text style={styles.title}>{`${index + 1}.- `}</Text>
          <Image allowDangerousPaths style={styles.imageTitleFormula} src={mathMLToUrl(title)} />
        </View>
      )}
      {image && <Image style={imageStyle(alignment)} src={image} />}
      {alternatives.map((alternative, altIndex) => (
        <PreviewAlternative
          key={`${question.id}-${alternative.id}`}
          index={altIndex}
          alternative={alternative}
        />
      ))}
    </React.Fragment>
  );
};

PreviewQuestion.defaultProps = {
  image: false
};

PreviewQuestion.propTypes = {
  question: validateQuestion.isRequired,
  index: PropTypes.number.isRequired,
  image: PropTypes.oneOfType(PropTypes.string, PropTypes.bool)
};

export default PreviewQuestion;
