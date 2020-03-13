import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page, Font, StyleSheet, Text } from '@react-pdf/renderer';
import { validateQuestions } from '../../../validators';
import PreviewQuestion from './previewQuestion';

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    textAlign: 'center',
    textDecoration: 'underline',
    // fontFamily: 'Oswald',
    textTransform: 'uppercase',
    marginTop: 64
  }
});

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const PreviewQuestions = props => {
  const { questions, title } = props;
  return (
    <Document>
      <Page>
        {title && <Text style={styles.title}>{title}</Text>}
        {questions.map((question, index) => (
          <PreviewQuestion key={question.id} index={index} question={question} />
        ))}
      </Page>
    </Document>
  );
};

PreviewQuestions.defaultProps = {
  title: false
};

PreviewQuestions.propTypes = {
  questions: validateQuestions.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export default PreviewQuestions;
