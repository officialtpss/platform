import React from 'react';
import { Col, Row } from 'reactstrap';
import QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toastr } from 'react-redux-toastr';

import { Small, Wrap, LABEL } from '../../../../components/styled-components/Typography';

const PPTAddress = ({wallet = {}, isBorrower}) => {
  const { address, isPending = true } = wallet;

  return (
    <div>
      {isBorrower &&
      <Row>
        <Col xs={12} className="m-b-20">
          <Small style={{fontSize: '16px'}}>Use your PPT as a collateral to get Pokens.</Small>
        </Col>
        <Col xs={12} className="m-b-20">
          <Small style={{fontSize: '16px'}}>
            Exchange ETH for XAUp to become a part of Populous Liquidity Pool and gain
            your interest, exchange it to the other tokens or to fiat GBP.
          </Small>
        </Col>
      </Row>
      }

      { isPending
        ? 'pending'
        :<Row>
          <Col>
            <Row>
              <Col className="p-r-0 m-b-20">
                <LABEL>YOUR POPULOUS WALLET ADDRESS</LABEL>
                <Wrap style={{fontSize: 16, fontWeight: 'normal', color: '#636466', lineHeight: '26px'}}>
                  <span className="p-r-10">{address}</span>
                  <CopyToClipboard
                    text={address}
                    onCopy={()=>toastr.success('Successfully copied to clipboard')}
                  >
                    <a href="#"><img src="/img/icons/clipboard.png" height={18}/></a>
                  </CopyToClipboard>
                </Wrap>
              </Col>
            </Row>
          </Col>

          <Col className="text-center m-b-20">
            <QRCode value={address} />
          </Col>
          {isBorrower &&
          <Col xs="12">
            <div className="flex-row m-t-30 align-content-center">
              <div className="m-r-10">
                <img src="/img/icons/ico-info.png" alt="Info" />
              </div>
              <div>
                Ensure that only PPT or Pokens will be deposited to this address. Any other tokens deposited may become lost.
              </div>
            </div>
          </Col>
          }
          {!isBorrower &&
          <Col xs="12">
            <div className="flex-row m-t-30 align-content-center">
              <div className="m-r-10">
                <img src="/img/icons/ico-info.png" alt="Info" />
              </div>
              <div>
                Ensure that only acceptable tokens will be deposited to this address. Any other tokens deposited may become lost.
              </div>
            </div>
          </Col>
          }
        </Row>
      }
    </div>
  );
};

export default PPTAddress;
