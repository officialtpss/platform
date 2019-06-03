import React from 'react';
import { Form, FormGroup, Label, Row, Col} from 'reactstrap';
import {
  areaCodes,
  countries,
  personalDetailsFields,
} from 'meteor/populous:constants';

import { H3 } from '../../../components/styled-components/Typography';
import { PrimaryButton } from '../../../components/styled-components/Buttons';
import { Input } from '../../../components/styled-components/Inputs';
import FormTextEl from '../helpers/FormTextEl';

const PersonalDetailsForm = ({ currentUser, save }) => (
  <Form
    onSubmit={e => {
      e.preventDefault();

      // TODO: client validation
      const updates = {};

      // Setup updates object
      personalDetailsFields.forEach(f => (
        updates[f] = e.target[f].value
      ));

      save(updates);
    }}
  >
    <Col>
      <H3>Personal details</H3>
      <FormTextEl
        user={currentUser}
        name="firstName"
        labelText="First name:"
      />
      <FormTextEl
        user={currentUser}
        name="lastName"
        labelText="Last name:"
      />
      <FormGroup>
        <Label for="phoneNumber">Phone number</Label>
        <Row>
          <Col xs="3">
            <Input
              defaultValue={currentUser.phoneAreaCode}
              name="phoneAreaCode"
              type="select"
            >
              {
                areaCodes.map((c, i) => (
                  <option key={i} value={c.code}>
                    { c.code } ({ c.name })
                  </option>
                ))
              }
            </Input>
          </Col>
          <Col xs="9">
            <Input
              defaultValue={currentUser.phoneNumber}
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
            />
          </Col>
        </Row>
      </FormGroup>
      <FormTextEl
        user={currentUser}
        name="occupation"
        labelText="Occupation:"
      />
      <FormTextEl
        user={currentUser}
        name="addressLine1"
        labelText="Address line 1:"
      />
      <FormTextEl
        user={currentUser}
        name="addressLine2"
        labelText="Address line 2:"
      />
      <FormTextEl
        user={currentUser}
        name="city"
        labelText="City:"
      />
      <FormTextEl
        user={currentUser}
        name="postcode"
        labelText="Postcode:"
      />
      <FormGroup>
        <Label for="country">Country</Label>
        <Input
          defaultValue={currentUser.country}
          id="country"
          name="country"
          type="select"
        >
          {
            countries.map(c => (
              <option key={c.key} value={c.key}>
                { c.name }
              </option>
            ))
          }
        </Input>
      </FormGroup>
      <PrimaryButton md primary>Save</PrimaryButton>
    </Col>
  </Form>
);

export default PersonalDetailsForm;
