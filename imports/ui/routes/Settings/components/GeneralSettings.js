import React, {Fragment} from 'react';
import {FormGroup, Form, Modal, ModalHeader, ModalBody, Label, Input} from 'reactstrap';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import {toastr} from 'react-redux-toastr';
import moment from 'moment';
import 'moment-timezone';
import {userProviderPermissions} from 'meteor/populous:constants'

import {PrimaryButton} from '../../../components/styled-components/Buttons';
import {H3, Small, P, LinkText, Lead, ColorDiv} from '../../../components/styled-components/Typography';
import RecoveryEmailModal from './RecoveryEmailModal';

const GeneralSettings = ({
  currentUser, setProfilePicture,
  generalEdit, timezoneEdit, emailEdit, toggleGeneralEdit, toggleTimezoneEdit, saveGeneralSetting, resetTwoFAKey, saveEmailSetting,
  updatePassword, togglePasswordForm, changePassword, toggleEmailEdit, removeNickname, recoveryEmail, toggleRecoveryEmail,
  saveRecoveryEmail,
}) => {
  const avatar = currentUser.avatar();

  const timeZones = moment.tz.names();
  const offsetTmz = [];
  for (const i in timeZones) {
    const tz = moment.tz(timeZones[i]).format('Z').replace(':00', '').replace(':30', '.5');
    let x = parseInt(tz);

    const timeZone = {
      label: `(GMT${moment.tz(timeZones[i]).format('Z')})${timeZones[i]}`,
      value: `${timeZones[i]}`,
      time: `${x}`,
    };
    offsetTmz.push(timeZone);
  }
  offsetTmz.sort((a, b) => a.time - b.time);
  const timeZoneString = `UTC ${moment.tz(currentUser.timezone).format('Z')} ${currentUser.timezone}`;
  const canRecord = currentUser.hasProviderPermissions(userProviderPermissions.canRecord);

  return (
    <div className="pane-container general-settings">
      <H3>General Settings</H3>
      <div className="flex-row m-t-30 m-b-30">
        <div className="avatar-wrapper">
          { avatar && <img src={ avatar.link() } alt="image preview" className="image-avatar"/> }
          <Dropzone onDrop={(input) => setProfilePicture(input) }
                    accept="image/jpeg,image/jpg,image/tiff,image/gif, image/png"
                    multiple={ false }
                    className="dropzone-avatar"
          >
            <div className="no-image"><img src="/img/icons/ico-plus.svg"/></div>
          </Dropzone>
        </div>
        <div className="flex-column m-l-30 container-fluid">
          <div className="d-flex justify-content-between">
            {
              currentUser.isInvestor() &&
              <FormGroup>
                <Small>Nickname</Small>
                {
                  !!currentUser.nickname ?
                    <P>{currentUser.nickname}</P> :
                    <LinkText onClick={() => toggleGeneralEdit(true)}>Add nickname</LinkText>
                }
              </FormGroup>
            }
            {
              currentUser.isInvestor() && currentUser.nickname &&
              <div>
                <div onClick={() => toggleGeneralEdit(true)} className="edit-btn d-inline">
                  <img src="/img/icons/ico-edit.svg"/>
                </div>
                <div onClick={() => removeNickname(true)} className="edit-btn d-inline">
                  <img src="/img/icons/ico-trash.svg"/>
                </div>
              </div>
            }
          </div>
          <div className="d-flex justify-content-between">
            <FormGroup>
              <Small>Time Zone</Small>
              <P>{timeZoneString}</P>
            </FormGroup>
            <div onClick={() => toggleTimezoneEdit(true)} className="edit-btn">
              <img src="/img/icons/ico-edit.svg"/>
            </div>
          </div>

          <div>
            <Small>
              Reference number
            </Small>
            <P>
              {currentUser._id}
            </P>
          </div>

          {(currentUser.isProvider() || currentUser.isProviderPending() )&&
          <div>
            <Small>
              Provider interface
            </Small>
            {currentUser.isProviderPending() &&
            <P cool className={'d-flex align-items-center'}>
              <img src="/img/icons/ico-in-progress.png" alt="Pending"
                   style={{marginLeft: '-8px'}}/>
              Provider registration is pending
            </P>
            }
            {currentUser.isProvider() && <Fragment>
              <P>
                Enabled with the following features:
              </P>
              <div className="d-flex align-items-start center">
                <img src="/img/icons/ico-check.png" width={24} className={'m-r-10'}
                     alt="Provided"/> <Small>Buy invoices on the market</Small>
              </div>
              <div className="d-flex align-items-center">
                <img src="/img/icons/ico-check.png" width={24} className={'m-r-10'}
                     alt="Provided"/> <Small>Sell invoices on the market</Small>
              </div>
              <ColorDiv cool={!canRecord} className="d-flex align-items-start" fontSize={14}>
                 <img src="/img/icons/ico-check.png" width={24} className={'m-r-10'}
                      alt="Provided" style={{visibility: (canRecord ? false : 'hidden')}}/>
                <div>
                  Record invoices on the blockchain
                  { !canRecord &&
                  <div>
                    Contact us at <a href={'mailto:info@populous.co'}>info@populous.co</a> to learn more about this feature
                  </div>}
                </div>
              </ColorDiv>
            </Fragment>}

          </div>
          }

        </div>
      </div>
      <hr />
      <div className="flex-row m-t-30">
        <div className="flex-column">
          <Lead>Account</Lead>
          <div className="d-flex">
            <FormGroup>
              <Small>Email</Small>
              <P>{currentUser.emails[0].address}</P>
            </FormGroup>
            <div onClick={() => toggleEmailEdit(true)} className="edit-btn">
              <img src="/img/icons/ico-edit.svg"/>
            </div>
          </div>

          <div className="m-b-10">
            <div className="d-flex">
              <FormGroup>
                <Small>Recovery email</Small>
                {currentUser.recoveryEmail && <P>{currentUser.recoveryEmail}</P>}
              </FormGroup>

              {currentUser.recoveryEmail &&
              <div onClick={() => toggleRecoveryEmail(true)} className="edit-btn">
                <img src="/img/icons/ico-edit.svg"/>
              </div>
              }
            </div>
            {!currentUser.recoveryEmail &&
            <div>
              <Link to={'#'} onClick={e => {
                e.preventDefault();
                toggleRecoveryEmail(true)
              }}>
                Add recovery email
              </Link>
            </div>
            }
          </div>
        </div>
      </div>
      <div className="d-md-block">
        <PrimaryButton md className="m-t-10" onClick={() => togglePasswordForm(true)}>Change Password</PrimaryButton>
        <br />
        <PrimaryButton md className="m-t-10" onClick={() => resetTwoFAKey()}>Reset 2-Factor
          Authentication</PrimaryButton>
      </div>

      <RecoveryEmailModal
        isOpen={recoveryEmail}
        toggle={toggleRecoveryEmail}
        saveRecoveryEmail={saveRecoveryEmail}
        currentUser={currentUser}
      />

      <Modal isOpen={generalEdit} toggle={toggleGeneralEdit} className="custom">
        <ModalHeader toggle={() => toggleGeneralEdit(false)}>Edit Account Data</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={e => {
              e.preventDefault();
              const {nickname} = e.target;
              if (!nickname.value || nickname.value.trim() === '') {
                toastr.error('Error', 'Please enter your nickname.');
                return;
              }
              toggleGeneralEdit(false);
              saveGeneralSetting({nickname: nickname.value});
            }}
            className="form custom"
          >
            <FormGroup>
              <Label for="nickname">Nickname</Label>
              <Input name="nickname" id="nickname" type="text" defaultValue={currentUser.nickname || ''}/>
            </FormGroup>
            <div className="d-flex justify-content-center align-content-center">
              <PrimaryButton>Save Settings</PrimaryButton>
            </div>
          </Form>
        </ModalBody>
      </Modal>

      <Modal isOpen={timezoneEdit} toggle={toggleTimezoneEdit} className="custom">
        <ModalHeader toggle={() => toggleTimezoneEdit(false)}>Change Time Zone</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={e => {
              e.preventDefault();
              const {timezone} = e.target;
              if (!timezone.value || timezone.value === '') {
                toastr.error('Error', 'Please choose a valid time zone.');
                return;
              } else if (timezone.value === currentUser.timezone) {
                toastr.error('Warning', 'You did not change the time zone.');
                return;
              }
              toggleTimezoneEdit(false);
              saveGeneralSetting({timezone: timezone.value});
            }}
            className="form custom"
          >
            <FormGroup>
              <Label>Time Zone</Label>
              <Input type="select" name="timezone" defaultValue={currentUser.timezone || ''}>
                <option value="">Select Time Zone...</option>
                {offsetTmz.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>{item.label}</option>
                  );
                })}
              </Input>
            </FormGroup>
            <div className="d-flex justify-content-center align-content-center">
              <PrimaryButton>Change Time Zone</PrimaryButton>
            </div>
          </Form>
        </ModalBody>
      </Modal>

      <Modal isOpen={emailEdit} toggle={toggleEmailEdit} className="custom">
        <ModalHeader toggle={() => toggleEmailEdit(false)}>Change Email</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={e => {
              e.preventDefault();
              const {email} = e.target;
              toggleEmailEdit(false);
              if (currentUser.emails[0].address != email.value) {
                saveEmailSetting(email.value);
              }
            }}
            className="form custom"
          >
            <FormGroup>
              <Label for="email">Email</Label>
              <Input name="email" id="email" type="text" defaultValue={currentUser.emails[0].address || ''}/>
            </FormGroup>
            <div className="d-flex justify-content-center align-content-center">
              <PrimaryButton>Change Email</PrimaryButton>
            </div>
          </Form>
        </ModalBody>
      </Modal>
      <Modal isOpen={changePassword} toggle={togglePasswordForm} className="custom">
        <ModalHeader toggle={() => togglePasswordForm(false)}>Change Password</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={e => {
              e.preventDefault();
              const {
                oldPassword,
                password,
                passwordConfirm
              } = e.target;
              if (password.value !== passwordConfirm.value) {
                toastr.error('Error', 'Your new passwords do not match');
                return;
              }
              togglePasswordForm(false);
              updatePassword(oldPassword.value, password.value);
            }}
            className="form custom"
          >
            <FormGroup>
              <Label for="oldPassword">Old Password</Label>
              <Input name="oldPassword" id="oldPassword" type="password"/>
            </FormGroup>
            <FormGroup>
              <Label for="password">New Password</Label>
              <Input name="password" id="password" type="password"/>
            </FormGroup>
            <FormGroup>
              <Label for="passwordConfirm">Confirm New Password</Label>
              <Input name="passwordConfirm" id="passwordConfirm" type="password"/>
            </FormGroup>
            <FormGroup className="m-0 text-center m-t-20">
              <PrimaryButton>Submit</PrimaryButton>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default GeneralSettings;
