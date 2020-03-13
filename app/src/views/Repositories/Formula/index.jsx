import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GoBack from '../../../components/GoBack';
import { validateHistory } from '../../../validators';
import FormulaComponent from '../../../components/Common/Formula';

const oldFormula =
  '<math xmlns="http://www.w3.org/1998/Math/MathML"><mo>&#xBF;</mo><mi>E</mi><mi>s</mi><mo>&#xA0;</mo><msup><mfenced><mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow></mfenced><mn>2</mn></msup><mo>&#xA0;</mo><mi>i</mi><mi>g</mi><mi>u</mi><mi>a</mi><mi>l</mi><mo>&#xA0;</mo><mi>a</mi><mo>&#xA0;</mo><msup><mi>a</mi><mn>2</mn></msup><mo>+</mo><msup><mi>b</mi><mn>2</mn></msup><mo>?</mo></math>';

class Formula extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlImagen: false
    };
    this.myRef = React.createRef();
  }

  render() {
    const { urlImagen } = this.state;
    const { history } = this.props;
    return (
      <Container>
        <Row>
          <Col>
            <GoBack history={history} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Fórmulas</h1>
            <FormulaComponent ref={this.myRef} formula={oldFormula} />
          </Col>
        </Row>
        <Row>
          <Col>
            <button
              onClick={() =>
                this.setState({
                  urlImagen: this.myRef.current.getImage(),
                  mathML: this.myRef.current.getMathML()
                })
              }
              style={{ marginTop: '16px', marginLeft: '16px' }}
              className="btn btn-primary"
              type="button"
            >
              Convertir a imagen
            </button>
            <span className="prueba-mensaje">* a veces no funciona bien</span>
          </Col>
        </Row>
        {urlImagen && (
          <Row style={{ paddingTop: '10px !important' }}>
            <Col>
              <img className="formula" src={urlImagen} alt="formula" />
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

Formula.propTypes = {
  history: validateHistory.isRequired
};
export default Formula;
