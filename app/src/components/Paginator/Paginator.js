
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './style.css';
import SVG from 'react-inlinesvg';
import {
  Button, Card, CardBody, CardImg, Col, Row, Label
} from 'reactstrap';
import iconArrowL from '../../assets/icons/lo-icon-arrow_left.svg';
import iconArrowR from '../../assets/icons/lo-icon-arrow_right.svg';
import iconArrowRoundR from '../../assets/icons/lo-icon-right-arrow-paginator.svg'
import iconArrowRoundL from '../../assets/icons/lo-icon-left-arrow-paginator.svg'


class Paginator extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  setPage(page) {
    const { totalRecords, perPage, totalPages } = this.props;
    if (page < 1 || page > totalPages) {
      return;
    }

    this.props.onChangePage(page);
  }

  renderPages() {
    const { page, totalPages,type } = this.props;
    const pages = [];
    for (let i = (page - 3); i <= totalPages; i++ ) {
      if (i <= 0) continue;
      const result = (
        <li key={i} className={i === page ? 'active-'+type : ''}>
          <a className="round" onClick={() => this.setPage(i)}>{i}</a>
        </li>
      );
      pages.push(result);
    }
    return pages;
  }

  render() {
    const { totalPages, page,type} = this.props;

    if (totalPages <= 1) {
      return null;
    }

    console.debug('antes del return');
    return (
      <ul className="pagination">
        <li className={page === 1 ? 'hidden' : ''}>
          <a onClick={() => this.setPage(parseInt(page) - 1)} className={type=="opinions"?"remove-padding-pagination":""}>
            {' '}
            <SVG src={type!="opinions"?iconArrowL:iconArrowRoundL}/>
            {type!="opinions"?"Anterior":""}

          </a>
        </li>
        {this.renderPages()}
        <li className={page === totalPages ? 'hidden' : ''} >
          <a onClick={() => this.setPage(parseInt(page) + 1)} className={type=="opinions"?"remove-padding-pagination":""}>
            {type!="opinions"?"Siguiente":""}
            {' '}
            <SVG src={type!="opinions"?iconArrowR:iconArrowRoundR}/>
          </a>
        </li>
      </ul>
    );
  }
}

export default Paginator;
