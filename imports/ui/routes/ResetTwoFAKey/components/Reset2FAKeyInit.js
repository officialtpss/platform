import React from 'react';
import styled from 'styled-components'

import { H3, P, LABEL } from '../../../components/styled-components/Typography';
import { StyledInput} from '../../../components/styled-components/Inputs';
import { PrimaryButton } from '../../../components/styled-components/Buttons'

const renderExternalWallets = (externalWallets, wallet, onWalletSelect) => {
  return (
    <div style={{textAlign: 'left'}} className='wallets-block m-t-30'>
      <LABEL>external wallet</LABEL>
      <StyledInput
        id="external-wallets-select"
        type="select"
        name="externalWallet"
        value={wallet}
        onChange={onWalletSelect}>
        <option value={0} key={1} style={{display: 'none', opacity: '0.7'}}>Select wallet</option>
        { externalWallets.length > 0 &&
          externalWallets.map(wallet => <option value={wallet.address} key={wallet._id}>{wallet.address}</option>)
        }
      </StyledInput>
    </div>
  );
};

const Reset2FAKeyInit = (props) => {
  const {externalWallets,className, nextStage, onWalletSelect, wallet} = props;
  return (
    <div className={`${className}`}>
      <div className='descriptionBlock m-t-20'>
        <P>
          You will be asked to make the balance in your external wallet equal to the given values. You
          will need to do it in three stages and will be given 5 minutes for each stage.
        </P>
      </div>
      {externalWallets && renderExternalWallets(externalWallets, wallet, onWalletSelect)}

      <PrimaryButton className="m-t-40" disabled={!wallet} onClick={nextStage}>
        Continue
      </PrimaryButton>
    </div>
  );
}

export default styled(Reset2FAKeyInit)`
  .wallets-block{
    max-width: 500px;
    margin: auto;
  }
  
  #external-wallets-select{
    opacity: 0.7;
  }
`;