import React, {Fragment} from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

import LoadMoreSpinner from '../components/LoadMoreSpinner';

export const renderDocumentsRadio = ({documents, name, className, input, checked, ...props}) => {
  const resultName = name || input.name;
  if (!documents) {
    return <div><LoadMoreSpinner /></div>;
  }

  const labels = {
    DrivingLicence: 'Driving licence',
    IdentityCard: 'Identity card',
    ResidencePermit: 'Residence permit',
    Passport: 'Passport'
  };

  return (
    <Fragment>
    {documents.map((item, index) => {
      return (
        <FormGroup className={className} key={index} check>
          <Input type="radio" id={resultName + '' + index} name={resultName} addon {...input}
                 {...props} value={item} checked={checked} defaultChecked={item === props.meta.initial}/>
          <Label htmlFor={resultName + '' + index} check>
            <div className="custom-document-radio"/>
            <div>{' ' + labels[item] }</div>
          </Label>
        </FormGroup>
      )
    })}
    </Fragment>
  )
};
