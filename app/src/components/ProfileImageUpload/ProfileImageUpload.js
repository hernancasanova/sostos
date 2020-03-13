import React, { Component } from 'react';
import {
 Col, Row, Label,Button
} from 'reactstrap';
import { URL_STATIC } from '../../configs/configs';
import { FormattedMessage } from 'react-intl';


class ProfileImageUpload extends Component {
 constructor(props) {
   super(props);
   this.state = {
     file: '',
     imagePreviewUrl: ''
   };
   this._handleImageChange = this._handleImageChange.bind(this);
   this._handleSubmit = this._handleSubmit.bind(this);
   this.fileUpload = React.createRef();
   this.showFileUpload = this.showFileUpload.bind(this);
 }

 _handleSubmit(e) {
   e.preventDefault();
   // TODO: do something with -> this.state.file
 }

 _handleImageChange(e) {
   e.preventDefault();

   let reader = new FileReader();
   let file = e.target.files[0];

   reader.onloadend = () => {
     this.setState({
       file: file,
       imagePreviewUrl: reader.result
     });
   }
   this.props.callbackFile(file);

   reader.readAsDataURL(file)
 }

 showFileUpload(){
   this.fileUpload.current.click();
 }

 render() {
   let {imagePreviewUrl} = this.state;
   let {picture} = this.props;
   let $imagePreview = null;
   if (imagePreviewUrl) {
     $imagePreview = (<img src={imagePreviewUrl} />);
   }

  return (
    <React.Fragment>
      <Row className="row-profile-100 upload-photo-profile">
        <Col sm = "3">
          <img className="home-profile-thumbnail-img" src={
            imagePreviewUrl ? imagePreviewUrl:picture ? (`${URL_STATIC}files/${picture.filename}`):""
            }
          />

        </Col>
       <Col sm = "9" className = "col-profile-upload-img">
         <Row><Col className = "home-your-profile-photo-title"><FormattedMessage
             id="profile.photo_title"
             defaultMessage="Your profile picture"
           /></Col></Row>
         <Row><Col className = "home-profile-your-photo-subtitle"><FormattedMessage
             id="profile.photo_subtitle"
             defaultMessage="The first thing that people see is your photo, choose the best one!"
           /></Col></Row>
         <Row>
           <Col>
            <input type="file"  id="my_file"  ref = {this.fileUpload}  style={{"display" : "none"}} onChange={this._handleImageChange} />
            <Button className ="button-profile-upload-img" onClick={this.showFileUpload}><FormattedMessage
             id="profile.photo_button"
             defaultMessage="Upload a picture"
           /></Button>
           </Col>
         </Row>
       </Col>
     </Row>

       {/*<form onSubmit={this._handleSubmit}>
         <input type="file" ref="fileUpload"  style={{"display" : "none"}} onChange={this._handleImageChange} />
         <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
       </form>
       {$imagePreview}*/}
     </React.Fragment>
   )
 }

}

export default ProfileImageUpload;