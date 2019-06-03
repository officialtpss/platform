import React from 'react';
import { Container, Row, Col, Collapse } from 'reactstrap';

import { P, Small } from '../../../components/styled-components/Typography';

const initialState = {
  collapse: false,
  userBrowser: 'Browser',
};

class Guides extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillMount() {
    if (navigator && navigator.userAgent) {
      this.setState({
        userBrowser: this.detectOS(navigator.userAgent)
      });
    }
  }

  detectOS = (userAgentString) => {
    const rules = [
      {name: 'iOS', rule: /iP(hone|od|ad)/},
      {name: 'Android OS', rule: /Android/},
    ];

    const detected = rules.filter((os) => {
      return os.rule.test(userAgentString);
    })[0];

    return detected ? detected.name : 'Browser';
  };

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    const {userBrowser, collapse} = this.state;

    const isAndroid = userBrowser === 'Android OS';
    const isIOS = userBrowser === 'iOS';
    const isBrowser = userBrowser === 'Browser';

    return (
      <Container fluid>
        <Row>
          <a href="javascript:;" className={collapse ? 'collapse-trigger in' : 'collapse-trigger'} onClick={this.toggle}>How does it work?</a>
          <Col xs={'12'} className="p-0 m-t-20">
            <Collapse isOpen={collapse} className="p-30" style={{'background': '#F5F7FA'}}>
              <Container>
                <Row>
                  <Col xs={'12'}>
                    <P>You must have an authentication app installed on your phone or tablet. This app generates access codes for your Populous account. We will ask you to enter these codes to confirm some important actions for your account, like login or changing account settings.</P>
                    <P>If you lost your authentication app or device, you can reset 2FA via email, like your password.</P>
                    <P>Authentication apps we can recommend are:</P>
                  </Col>
                  <Col xs={'12'} md={'4'}  className="m-b-10">
                    <img className="pull-left" src="/img/app/img-ga-logo@2x.png" width={48} alt="Google Authenticator" />
                    <div className="p-l-10 pull-left">
                      <P className="m-b-0">
                        Google Authenticator
                      </P>
                      <Small inline>Download:</Small>
                      {(isBrowser || isIOS)  &&
                        <Small inline className="m-l-10">
                          <a href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8" target="_blank">
                            App Store
                          </a>
                        </Small>
                      }
                      {(isBrowser || isAndroid) &&
                        <Small inline className="m-l-10">
                          <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en" target="_blank">
                            Google Play
                          </a>
                        </Small>
                      }
                    </div>
                  </Col>
                  <Col xs={'12'} md={'4'} className="m-b-10">
                    <img className="pull-left" src="/img/app/img-authy-logo@2x.png" width={48} alt="Authy" />
                    <div className="p-l-10 pull-left">
                      <P className="m-b-0">
                        Authy
                      </P>
                      <Small inline>Download:</Small>
                      {(isBrowser || isIOS) &&
                        <Small inline className="m-l-10">
                          <a href="https://itunes.apple.com/us/app/authy/id494168017" target="_blank">
                            App Store
                          </a>
                        </Small>
                      }
                      {(isBrowser || isAndroid) &&
                        <Small inline className="m-l-10">
                          <a href="https://play.google.com/store/apps/details?id=com.authy.authy&hl=en" target="_blank">
                            Google Play
                          </a>
                        </Small>
                      }
                    </div>
                  </Col>
                  <Col xs={'12'} md={'4'} className="m-b-10">
                    <img className="pull-left" src="/img/app/img-duo-logo@2x.png" width={48} alt="Duo Mobile" />
                    <div className="p-l-10 pull-left">
                      <P className="m-b-0">
                        Duo Mobile
                      </P>
                      <Small inline>Download:</Small>
                      {(isBrowser || isIOS) &&
                        <Small inline className="m-l-10">
                          <a href="https://itunes.apple.com/us/app/duo-mobile/id422663827?mt=8" target="_blank">
                            App Store
                          </a>
                        </Small>
                      }
                      {(isBrowser || isAndroid) &&
                        <Small inline className="m-l-10">
                          <a href="https://play.google.com/store/apps/details?id=com.duosecurity.duomobile&hl=en" target="_blank">
                            Google Play
                          </a>
                        </Small>
                      }
                    </div>
                  </Col>
                </Row>
              </Container>
            </Collapse>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Guides;
