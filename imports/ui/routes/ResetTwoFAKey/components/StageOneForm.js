import React from 'react';
import { CardBody, CardFooter } from 'reactstrap';
import { Small, LabelText } from '../../../components/styled-components/Typography';
import { PrimaryButton } from '../../../components/styled-components/Buttons'
import { Card } from '../../../components/styled-components/Card/index';
import styled from 'styled-components'

const StageOneForm = (props) => {

  const {className, nextStage, stage, wallet, randomBalance, timerValue} = props;
  const buttonText = {
    1 : 'next stage',
    2 : 'next stage',
    3 : 'reset 2FA',
  };
  const setActiveClass = (step) => {
    return stage>=step ? 'active' : '';
  }

  return (
    <div className={`${className}`}>
      <div className='m-t-30'>
        <Small>Wallet address</Small>
        <div>{wallet ? wallet : 'not selected.'}</div>
      </div>

      <Card className='m-t-30'>
        <CardBody>
          <div className='balanceBlock'>
            <Small className='m-b-10'>Required balance</Small>
            <div className='value'>
              <LabelText>PPT {randomBalance}</LabelText>
            </div>
          </div>

          <div className='timeBlock m-t-30'>
            <Small className='m-b-10'>Time left</Small>
            <LabelText>{timerValue}</LabelText>
          </div>
        </CardBody>

        <CardFooter>
          <span className={setActiveClass(1)}>Stage 1</span>
          <span className='divider m-l-10 m-r-10'></span> <span className={setActiveClass(2)}>Stage 2</span>
          <span className='divider m-l-10 m-r-10'></span> <span className={setActiveClass(3)}>Stage 3</span>
        </CardFooter>
      </Card>

      <PrimaryButton className="m-t-40" onClick={()=>{nextStage(true)}}>
        {buttonText[stage]}
      </PrimaryButton>
    </div>
  );
}

export default styled(StageOneForm)`
  .card{
    max-width: 500px;
    margin: auto;
    
    .active{
      color: #77c58c;
    }      
    .balanceBlock{
      .value{
        display: inline-block;
        height: 32px;
        padding: 5px;
        background: #e1e5eb;
      }
    }
  }
  .card-footer{
    background: white;
    color: #a5acb5;
    
    .divider{
      display: inline-block;
      width: 26px;
      border: solid 1px;
      height: 1px;
      margin-bottom: 3px;
      opacity: 0.6;
    }
  }
`;