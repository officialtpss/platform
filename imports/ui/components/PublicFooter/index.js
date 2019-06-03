import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Input, FormGroup } from 'reactstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <StyledFooter>
      <div className="info">
        <div className="left-info">
          <img src="/img/Group 828.png" height="80" />
          <div>+44(0)843 848 6671</div>
          <div>info@populous.world</div>
          <div>© {currentYear} Populous Invoice Platform</div>
        </div>

        <div className="right-info">
          <div className="links-wrapper">
            <div className="support-and-pages">
              <div className="links">
                <div className="subtitle">SUPPORT</div>
                <ul>
                  <li>FAQ</li>
                  <li>Terms</li>
                  <li>Contact</li>
                </ul>
              </div>

              <div className="links">
                <div className="subtitle">PAGES</div>
                <ul>
                  <li>News</li>
                  <li>Terms of Use</li>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/registration">Register</Link></li>
                </ul>
              </div>
            </div>

            <div className="follow-wrapper">
              <div className="links follow-up">
                <div className="subtitle">FOLLOW US</div>
                <div className="social-icons-container">
                  <div className="social-wrapper">
                    <img src="/img/facebook-logo (1).svg" />
                  </div>

                  <div className="social-wrapper">
                    <img src="/img/twitter-logo-silhouette.svg" />
                  </div>

                  <div className="social-wrapper">
                    <img src="/img/google-plus (1).svg" />
                  </div>

                  <div className="social-wrapper">
                    <img src="/img/youtube (1).svg" />
                  </div>

                  <div className="social-wrapper">
                    <img src="/img/instagram (1).svg" />
                  </div>
                </div>
              </div>            
            </div>
          </div>

          <div className="contact-wrapper">
            <div className="links">
              <div className="subtitle">CONTACT US</div>
              <div className="input-wrapper">
                <FormGroup>
                  <Input type="name" placeholder="Name" />
                </FormGroup>
                <FormGroup>
                  <Input type="email" placeholder="Email address" />
                </FormGroup>
                <FormGroup>
                  <Input type="textarea" placeholder="Message" />
                </FormGroup>
                <FormGroup>
                  <Button>Send Message</Button>
                </FormGroup>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copywriter">
        {currentYear} Populous World Ltd. All Rights Reserved
      </div>
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  background-color: #2F3A4D;
  color: white;

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 58px 140px;

    .left-info {
      div {
        padding: 10px 0;
      }
    }

    .right-info {
      display: flex;
      align-items: space-between;

      .links-wrapper {
        .support-and-pages {
          display: flex;
        }
      }

      .links {
        min-width: 100px;
        padding-right: 50px;

        &.follow-up {
          width: 220px;
          padding-right: 0;
        }

        .subtitle {
          width: 100%;
          border-bottom: solid 2px #939396;
          padding: 20px 0;
          margin-bottom: 20px;
          font-size: 20px;
          font-weight: bold;
        }

        .social-icons-container {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .social-wrapper {
            width: 36px;
            height: 36px;
            border-radius: 18px;
            border: solid 1px #B1AFB0;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        .input-wrapper {
          .form-group {
            input, textarea {
              background-color: #384558;
              border: none;
            }

            button.btn {
              width: 100%;
              background-color: #589DF9;
              border: none;
            }
          }
        }
      }

      ul {
        list-style: none;
        padding-left: 0;
        li {
          padding: 10px 0;
          font-size: 16px;
          color: #939396;
          a {
            color: #939396;              
          }
        }
      }
    }
  }

  .copywriter {
    opacity: 0.8;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: #384558;
  }

  a {
    text-decoration: none;
    color: white;
  }
`

export default Footer
