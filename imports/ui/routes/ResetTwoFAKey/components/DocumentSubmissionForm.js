import React, {Component} from 'react';
import { P } from '../../../components/styled-components/Typography';
import { PrimaryButton } from '../../../components/styled-components/Buttons';
import styled from 'styled-components';
import {reduxForm, Field } from 'redux-form';
import CameraAccessConfirmModal from './CameraAccessConfirmModal';
import DropzoneLivePhoto from '../../../form-helpers/renderDropzoneLivePhoto';

class DocumentSubmissionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isCameraAccessConfirmOpen: false,
      isAccessToCameraAllowed: false,
    };
  }

  toggle = ()=>{
    this.setState({
      isCameraAccessConfirmOpen: !this.state.isCameraAccessConfirmOpen,
    });
  }

  allowAccessToCamera = () => {
    this.setState({
      isAccessToCameraAllowed: true,
      isCameraAccessConfirmOpen: false,
    });
  }

  render(){

    const { uploadFile, fileSaved, confirmTwoFAKeyReset, className, user } = this.props;

    return (
      <div className={className}>
        <div className='descriptionBlock m-t-30'>
          Take a high quality photo of yourself holding your ID document submitted during registration and a handwritten note:
        </div>

        <P style={{fontStyle: 'italic'}} className='m-t-30 m-b-30'>
          "[current date] for Populous only"
        </P>

        <div className="avatarWrapper">
          <div className="borderedZone">
            <form className="form custom">
              <Field
                name="livePhoto"
                component={DropzoneLivePhoto}
                backgroundImage={'/img/img-2fa-reset@2x.png'}
                styles={{
                  width: 220,
                  height: 220,
                }}
                acceptedFiles=".png, .jpg, .jpeg"
                onChange={(accepted, rejected) => confirmTwoFAKeyReset(accepted)}
              />
              </form>
            </div>
        </div>

        <P className='m-t-20'>We have to ask you to be patient. Such requests processing make take up to several days.</P>

        <PrimaryButton
          className="m-t-40"
          type={'submit'}
          onClick={() => {uploadFile(user)}}
        >
          submit request
        </PrimaryButton>

        <CameraAccessConfirmModal
          isOpen={this.state.isAccessToCameraAllowed}
          allowAccess={this.allowAccessToCamera}
          toggle={this.toggle}
        />
      </div>
    );
  }
}

const reduxDocumentSubmission = reduxForm({
  form: 'documentSubmissionForm',
})(DocumentSubmissionForm);


export default styled(reduxDocumentSubmission)`
 .avatarWrapper{
   display: flex;
   justify-content: center;
   
   .backgroundImage{
     width: 110px;
     height: 110px;
     margin-right: 10px;
   }
   
   .borderedZone{
     max-width: 220px;
     max-height: 220px;
     background-image: url("/img/upload-docs-background.png");
     background-size: 100%;
    
     .m-t-10{
       margin-top: 0px !important;
     }    
   }
 }
`;
