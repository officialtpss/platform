import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components'
import { H3 } from '../../../components/styled-components/Typography';
import { Content } from '../../../components/styled-components/Divs';
import NavigationLoggedOut from '../../../components/Navigation/NavigationLoggedOut';
import Footer from '../../../components/Footer';

import ResetInitForm from './Reset2FAKeyInit';
import StageOneForm from  './StageOneForm';
import AlternativeMethodForm from './AlternativeMethodForm';
import DocumentSubmissionForm from './DocumentSubmissionForm';
import {toastr} from "react-redux-toastr";

class ResetTwoFA extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      resetMethod: (props.currentUser && props.currentUser.isBorrower()) ? 'alternative' : 'primary',
      stage: 0,
      externalAddress: '',
      randomBalance: '',
      timerId: undefined,
      timerValue: '5:00',
    };
  }

  nextStage = (isForward)=>{

    const {randomBalance, stage, externalAddress} = this.state;

    this.setRandomBalance();
    if(isForward && randomBalance){
      this.compareBalances(randomBalance, externalAddress);
      return;
    }

    this.setState({
      stage: isForward ? stage+1 : 1,
      timerId: this.downCounter(),
    });
  };

  downCounter = () => {

    clearTimeout(this.state.timerId);

    let timeLimit = 300;
    let min, sec;

    return setInterval(()=>{
      if(timeLimit>0){
        timeLimit--;
        min = (timeLimit / 60)>>0;
        sec = timeLimit % 60;
        sec = sec<10 ? `0${sec}` : sec;

        this.setState({timerValue: `${min}:${sec }`})
      } else {
        this.nextStage(false);
      }
    }, 1000);
  }

  componentDidMount(){
    if(!this.props.currentUser){
      this.props.history.push('/login');
    }
  }

  componentWillUnmount(){
    clearTimeout(this.state.timerId);
  }

  toggleMethod = (method) => {
    if(!method){
      switch (this.state.resetMethod){
        case 'primary':
          method = 'alternative';
          break;
        case 'alternative':
          method = 'primary';
          break;
        case 'documentSubmission':
          method = 'alternative';
          break;
      }
    }
    this.setState({
      resetMethod: method,
      stage: 0,
    });
  }

  onWalletSelect = (e) => {
    this.setState({
      externalAddress: e.target.value,
    });
  }

  getLinkText = () => {
    switch (this.state.resetMethod){
      case 'primary':
        return 'Use alternative method';
      case 'alternative':
        return 'Use Primary method';
      case 'documentSubmission':
        return 'Use another method';
    }
  }

  renderForm = () => {
    const {stage, externalAddress, resetMethod, randomBalance, timerValue} = this.state;
    const {currentUser, uploadFile, fileSaved, confirmTwoFAKeyReset} = this.props;

    if(!currentUser.isBorrower() && resetMethod==='primary'){
      switch (stage){
        case 1:
        case 2:
        case 3:
          return <StageOneForm
            {...this.props}
            nextStage={this.nextStage}
            stage={stage}
            wallet={externalAddress}
            randomBalance={randomBalance}
            timerValue={timerValue}
          />;
        default:
          return <ResetInitForm
            {...this.props}
            nextStage={this.nextStage}
            onWalletSelect={this.onWalletSelect}
            wallet={externalAddress}
          />;
      }
    } else if(resetMethod==='alternative') {
      return <AlternativeMethodForm  {...this.props} toggleMethod={this.toggleMethod} />;
    } else {
      return <DocumentSubmissionForm
        toggleMethod={this.toggleMethod}
        uploadFile={uploadFile}
        fileSaved={fileSaved}
        confirmTwoFAKeyReset={confirmTwoFAKeyReset}
        user={currentUser}
      />
    }
  };

  setRandomBalance = () => {
    const {wallet} = this.props;

    if(wallet){
      wallet.callMethod('generateRandomBalanceString', (err, res) => {
        if(res){
          this.setState({
            randomBalance: res
          });
        } else {
          console.log('ERROR: ', err);
        }
      });
    }
  }

  compareBalances = (randomBalance, externalAddress) => {
    const {wallet, history, reduxUser, } = this.props;

    if(wallet){
      wallet.callMethod('compareBalances', randomBalance, externalAddress, (err, res) => {
        if(!err){
          const nextStage = this.state.stage+1;

          if (nextStage > 3) {
            clearTimeout(this.state.timerId);
            if (reduxUser) {
              history.push('/settings/setup-2-fa')
            } else {
              toastr.success('2FA has been successfully reset, please login again');
              history.push('/login');
            }
            return;
          }

          this.setRandomBalance();
          this.setState({
            stage: res ? nextStage : 1,
            timerId: this.downCounter(),
          });
        } else {
          console.log('Error: ', err);
        }
      });
    }
  }

  render() {

    if(!this.props.currentUser ) {
     return null
    }

    return (
      <div className={`${this.props.className}`}>
        {!this.props.currentUser && <NavigationLoggedOut />}
        <Content>
          <Container>
            <Row style={{justifyContent: 'center'}}>
              <Col className={'resetTwoFAForm'}>
                <H3 className="m-t-60">2-factor authentication reset</H3>

                {this.renderForm()}

                {!this.props.currentUser.isBorrower() &&
                <a href="javascript:void(0);" className='m-t-30' onClick={()=>{this.toggleMethod()}}>
                    {this.getLinkText(this.state.resetMethod)}
                  </a>
                }
              </Col>
            </Row>
          </Container>
        </Content>
        {!this.props.currentUser && <Footer /> }
      </div>
    );
  }
}

export default styled(ResetTwoFA)`
  .resetTwoFAForm{
    flex: 0.8;
    text-align: center;
    
  .descriptionBlock{
    max-width: 650px;
    margin: auto;
  } 
    
  .wallets-block{
    max-width: 500px;
    margin: auto;
  }
    
  a{
    display: block;
  }
}
`;
