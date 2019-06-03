import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Container, Row, Col} from 'reactstrap';

import UnverifiedOrDeclinedRoute from '../../../route-helpers/UnverifiedOrDeclinedRoute';
import Declined from '../Declined';
import KYCWizardFormContainer from '../forms/KYCWizardFormContainer';
import {H3, P, Lead} from '../../../components/styled-components/Typography';
import AlertModal from '../../../components/AlertModal';
import {showAlertModal} from '../../../components/AlertModal/modules/actions';

class Upload extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(!this.props.currentUser.isAbleToRequestKycVerification(true)){
      this.props.history.push('/settings#profile');
    }
  }

  render() {
    const props = this.props;

    return (
      <div className={props.className}>
        <Container>
          <UnverifiedOrDeclinedRoute
            component={Declined}
            path="/upload/declined"
            exact
          />

          <Row className="text-center">
            <Col xs={'12'} sm={{size: '10', offset: 1}} md={{size: '12', offset: 0}} lg={{size: '8', offset: 2}}>
              <P className="m-t-40 m-b-20">
                <img src="/img/img-profile.png" height={70}/>
              </P>
              <H3 className="m-t-30 m-b-20">
                Populous Customer Profile
              </H3>
              <P>
                To {props.currentUser.isBorrower() ? 'sell' : 'buy'} invoices on the platform, please provide relevant identification documents. This allows us to
                keep your account active and safe. Your documents will be processed within 24-48 hours of upload.
              </P>

              <P>
                All fields are mandatory.
              </P>
            </Col>
          </Row>

          <KYCWizardFormContainer
            hashMissingKYCPart={props.location.state ? props.location.state.hash : null}
            pageMissingKYCPart={props.location.state ? props.location.state.page : null}
          />

        </Container>
        <div className="p-t-10 p-b-20 m-t-40" style={{background: '#f5f7fa'}}>
          <Container className='requirementsBlock'>
            <Row className="m-t-40">
              <Col xs={12} className="m-b-20">
                <Lead className='title'>Requirements for uploaded documents</Lead>
                <P>
                  Acceptable file formats: <strong>pdf, jpg, png</strong>.<br/>
                  Maximum fIle size: <strong>3Mb</strong>.<br/>
                  All photos/copies must be colored.<br/>
                </P>
                <P>
                  Capturing quality images is highly important for successful verification. Please follow the suggested recommendations:<br/>
                  - The entire document should be contained within the image including all edges;<br/>
                  - Your fingers should not obstruct the document;<br/>
                  - There should not be any glare or shadows dropped on the document/face;<br/>
                  - Capture a non-blurry image;<br/>
                  - Take a photo perpendicularly to the document surface;<br/>
                  - Put the document on contrasting background;<br/>
                  - Take a photo in a well-lit room;<br/>
                  - Look directly at the camera when you are taking a photo of yourself.<br/>
                </P>
              </Col>
            </Row>
            <AlertModal />
          </Container>
        </div>
      </div>
    );
  }
}

const styledUpload = styled(Upload)`
  .requirementsBlock{
    
    opacity: 0.9;
    
    p, strong{
      font-size: 14px;
    } 
         
    .title{
      font-size: 19px;
      font-weight: 400;
      opacity: 1;
    }  
  }
`;

const mapStateToProps = ({ app }) => ({
  currentUser: app.currentUser,
});

export default connect( mapStateToProps, {
  showAlertModal: showAlertModal
})(styledUpload);
