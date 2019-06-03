import React, {Fragment} from 'react';
import {countries, statuses, employeeNumbers} from 'meteor/populous:constants';

export function KYCProvideStatus ({user}){

  if(user.KYCStatus === statuses.verified || user.KYCStatus === statuses.pending){
    return (<Fragment><img src="/img/icons/ico-check.png" alt="Provided"/> Provided</Fragment>)
  }
  if(user.KYCStatus !== statuses.verified && user.KYCStatus !== statuses.pending){
    return (<Fragment><img src="/img/icons/ico-cross.png" alt="Not Provided"/> Not Provided</Fragment>)
  }
}

export function KYCVerifyStatus ({user}){

  if(user.KYCStatus === statuses.verified){
    return (<Fragment><img src="/img/icons/ico-check.png" alt="Verified"/> Verified</Fragment>)
  }
  if(user.KYCStatus === statuses.pending){
    return (<Fragment><img src="/img/icons/ico-in-progress.png" alt="Verifying"/> Verifying</Fragment>)
  }
  if(user.KYCStatus === statuses.unverified){
    return (<Fragment><img src="/img/icons/ico-cross.png" alt="Unverified"/> Unverified</Fragment>)
  }
  if(user.KYCStatus === statuses.declined){
    return (<Fragment>
      <img src="/img/icons/ico-cross.png" alt="Rejected"/> Rejected
      <span className="question-mark">
                    <img src="/img/icons/ico-question.svg" height="20"/>
                    <span className="tooltip-error">We couldn't verify data you provided. Please make sure you provide real information and relevant documents.</span>
                  </span>
    </Fragment>)
  }
}
