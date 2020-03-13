import React from 'react';
import { Text, StyleSheet, Image } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import { validateAlternative } from '../../../validators';

const ALIGNMENTS = {
  LEFT: 'left',
  MIDDLE: 'middle',
  RIGHT: 'right'
};

const styles = StyleSheet.create({
  textCorrect: {
    marginTop: 8,
    marginLeft: 80,
    marginRight: 80,
    fontSize: 12,
    textAlign: 'justify',
    // fontFamily: 'Oswald',
    backgroundColor: 'lightgreen'
  },
  imageLeft: {
    height: '50',
    marginLeft: 80,
    marginRight: 'auto'
  },
  imageMiddle: {
    height: '50',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  imageRight: {
    height: '50',
    marginLeft: 'auto',
    marginRight: 80
  },
  textIncorrect: {
    marginTop: 8,
    marginLeft: 80,
    fontSize: 12,
    textAlign: 'justify',
    // fontFamily: 'Oswald',
    marginRight: 80,
    backgroundColor: 'lightpink'
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

const PreviewAlternative = props => {
  const { index, alternative } = props;
  const { text, correct, image, alignment } = alternative;
  const alignmentFix = alignment || 'left';
  const totalText = `${String.fromCharCode(index + 97)}) ${text}`;
  return (
    <React.Fragment>
      <Text style={correct ? styles.textCorrect : styles.textIncorrect}>{totalText}</Text>
      {image && <Image style={imageStyle(alignmentFix)} src={image} />}
    </React.Fragment>
  );
};

PreviewAlternative.propTypes = {
  index: PropTypes.number.isRequired,
  alternative: validateAlternative.isRequired
};

export default PreviewAlternative;
