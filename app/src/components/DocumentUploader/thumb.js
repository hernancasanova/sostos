import React, {Component} from 'react';
import close from './close.png';
import file from './file.png';
import Lightbox from 'react-image-lightbox';
import {
 Label
} from 'reactstrap';

class Thumb extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }
    render(){
        return(
    
            <div className='thumb'>
                <div className='inner-thumb'>
                    <img alt='close' onClick={() => this.props.closeThumb(this.props.file)} className='close-thumb' src={close} />
                    <img
                        alt={this.props.file.name}
                        className='img-thumb'
                        onClick={() => this.setState({ visible: true})}
                        src={file}
                    />
                    <Label className='label-thumb'>
                    {this.props.file.name}
                    </Label>
                </div>
            </div>
        );
    }
}
export default Thumb;