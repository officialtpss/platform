import React, {Fragment} from 'react';
import styled from 'styled-components';
import {Row, Col} from 'reactstrap';
import {Wrap, P} from '../../../components/styled-components/Typography';

const KycInfograph = props => {

  const {className} = props;

  return (
    <Row className={className}>
      <Col md={12} className="p-15 m-b-15 m-t-10 text-center">
        <span>Capturing quality images is highly important for successful verification.</span> <br/>
        <span>Please read the requirements, consider the most common mistakes below and avoid them.</span>
      </Col>

      <Col sm={12} md={4} className="infoGraphCell p-20">
        <div>
          <div className='imageBlock p-15 m-b-10'>
            <img src="/img/kycInfograph/acceptable.png" />
            <div className="iconWrapper right">
              <img src="/img/icons/ico-check.svg" className="icon"/>
            </div>
          </div>

          <div className="descriptionBlock">
            <Wrap className="blockTitle">Acceptable photo</Wrap>
          </div>
        </div>
      </Col>

      <Col sm={12} md={8} lg={8} className="p-15">
        Acceptable file formats: <br/>
        - for an identity document: <strong>jpg, png</strong> ; <br/>
        - for a bank statement, address proof, invoice, contracts: <strong>jpg, png, pdf .</strong> <br/>
        Minimum fIle size: <strong>15Kb .</strong> <br/>
        Maximum fIle size: <strong>3Mb .</strong> <br/>
        All photos/copies must be colored .
      </Col>

      <Col sm={12} md={6} lg={4} className="infoGraphCell p-20">
        <div>
          <div className='imageBlock p-15 m-b-10'>
            <img src="/img/kycInfograph/blurry.png" />
            <div className="iconWrapper wrong">
              <img src="/img/icons/ico-cross.svg" className="icon"/>
            </div>
          </div>

          <div className="descriptionBlock">
            <Wrap className="blockTitle">Blurry photo</Wrap>

            <P>
              Keep your camera steady and take a photo in a well-lit room
            </P>
          </div>

        </div>
      </Col>
      <Col sm={12} md={6} lg={4} className="infoGraphCell p-20">
        <div>
          <div className='imageBlock p-15 m-b-10'>
            <img src="/img/kycInfograph/acceptable.png" />
            <div className="iconWrapper wrong">
              <img src="/img/icons/ico-cross.svg" className="icon"/>
            </div>
            <div className="shadowBlock"></div>
            <div className="backroundBlock"></div>
          </div>

          <div className="descriptionBlock">
            <Wrap className="blockTitle">Dropped shadow. Dark photo</Wrap>
            <P>Take a photo in a well-lit room. Make sure
              there is no glare or shadows dropped.
            </P>
          </div>
        </div>
      </Col>
      <Col sm={12} md={6} lg={4} className="infoGraphCell p-20">
        <div>
          <div className='imageBlock cutOff p-15 m-b-10'>
            <img src="/img/kycInfograph/cutOffPhoto.png" className="picture" />
            <img src="/img/kycInfograph/thumb.png" className="thumb" />
            <div className="iconWrapper wrong">
              <img src="/img/icons/ico-cross.svg" className="icon"/>
            </div>
          </div>

          <div className="descriptionBlock">
            <Wrap className="blockTitle">Cut off photo. Fingers obstruct the document</Wrap>
          </div>
          <P>
            The entire document should be contained within the photo including all edges
          </P>
        </div>
      </Col>

      <Col sm={12} md={6} lg={4} className="infoGraphCell p-20">
        <div>
          <div className='imageBlock toSmall p-15 m-b-10'>
            <img src="/img/kycInfograph/acceptable.png" className="m-t-40" />
            <div className="iconWrapper wrong">
              <img src="/img/icons/ico-cross.svg" className="icon"/>
            </div>
          </div>

          <div className="descriptionBlock">
            <Wrap className="blockTitle">Too small picture</Wrap>
            <P>
              A document must fill at least 80% of an image
            </P>
          </div>
        </div>
      </Col>
      <Col sm={12} md={6} lg={4} className="infoGraphCell p-20">
        <div>
          <div className='imageBlock badContrast p-15 m-b-10'>
            <img src="/img/kycInfograph/badContrast.png" />
            <div className="iconWrapper wrong">
              <img src="/img/icons/ico-cross.svg" className="icon"/>
            </div>
          </div>

          <div className="descriptionBlock">
            <Wrap className="blockTitle">Bad contrast with a background</Wrap>
            <P>
              Choose the contrasting background surface for your document
            </P>

            <P>
              Applies <strong className="blockTitle">only to identity document.</strong>
            </P>
          </div>
        </div>
      </Col>
      <Col sm={12} md={6} lg={4} className="infoGraphCell p-20">
        <div>
          <div className='imageBlock p-15 m-b-10'>
            <img src="/img/kycInfograph/atAnglePhoto.png" />
            <div className="iconWrapper wrong">
              <img src="/img/icons/ico-cross.svg" className="icon"/>
            </div>
          </div>

          <div className="descriptionBlock">
            <Wrap className="blockTitle">Photo at a angle</Wrap>
            <P>Take a photo perpendicularly to the document surface</P>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default styled(KycInfograph)`

  .infoGraphCell{
    display: flex;
    justify-content: center;
    
    .blockTitle{
      color: #636466;
    }
  }

  .imageBlock{
    background: #a5acb5;
    text-align: center;
    width: 270px;
    height: 180px;
    position: relative;
    
    img {
      width: 220px;
    }
    
    .thumb{
      width: 55px;
      height: 110px;
      left: 25px;
      top: 140px;
      position: absolute;
      transform: rotate(45deg);
    }
    
    .shadowBlock{
      width: 100%;
      height: 100%;
      position: absolute;
      background-image: url("/img/kycInfograph/shadow.png");
      background-size: 170px 242px;;
      background-repeat: no-repeat;
      background-position: right 10px bottom -15px;
      top: 0;
      left: 0;
    }
    
    .backroundBlock{
      width: 100%;
      height: 100%;
      position: absolute;
      background: black;
      top: 0;
      left: 0;
      opacity: 0.2;
    }
    
    .iconWrapper{
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background: white;
      position: absolute;
      right: -15px;
      bottom: -15px;
      z-index: 1;
    }
      
    .icon{
      width: 30px;
      height: 30px;
      margin-top: 4px;
    }
      
    .wrong{
      border: solid 2px #c57777;
    }
      
    .right{
      border: solid 2px #77c58c;
    }
  }
  .cutOff{
    .picture{
      margin-top: 23px;
      margin-left: 40px;
    }
  }
  .toSmall{
    img{
      width: 120px;
    }
  }
  .badContrast{
    background: #e1e5eb;
  }
`;