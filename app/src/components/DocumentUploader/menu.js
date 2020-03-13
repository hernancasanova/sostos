import React, { Component } from 'react';

class Menu extends Component {
    render() {
        return (
            <div className='menu'>
                <div className={
                    this.props.empty ? 'menu-left menu-active' : 'menu-left'
                }>
                    {this.props.upload}
                </div>
                <div className={
                    !this.props.empty ? 'menu-right menu-active' : 'menu-right'
                }>
                    {this.props.view}
                </div>
            </div>
        );
    }
}
export default Menu;