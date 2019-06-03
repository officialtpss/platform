import React, { Fragment } from 'react';

import PPTWithdrawForm from './PPTWithdrawForm';

const PPTForm = ({externalsAddresses, wallet = {}, withdrawPPT, canWithdrawPPT, fee}) => {
  return (
      <div>
        <PPTWithdrawForm
          {...{
            externalsAddresses,
            wallet,
            canWithdrawPPT
          }}
          withdrawPPT={withdrawPPT}
          fee={fee}
         />
      </div>
  );
};

export default PPTForm;
