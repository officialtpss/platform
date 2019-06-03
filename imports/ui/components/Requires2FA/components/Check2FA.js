import React from 'react';
import { fixtures } from 'meteor/populous:constants';

import Modal2FA from './Modal2FA';
import ModalWithdrawal2FA from './ModalWithdrawal2FA';
import ModalRestrictedAccess from './ModalRestrictedAccess';

const bgStyles = {
  background: 'rgba(0, 0, 0, 0.4)',
  bottom: '0',
  left: '0',
  position: 'fixed',
  right: '0',
  top: '0',
  zIndex: '3',
  overflow: 'auto'
};

const mainStyles = {
  background: '#fff',
  position: 'relative',
  transform: 'translate(0)',
  WebkitTransform: 'translate(0)',
  transition: 'transform .3s ease-out,-webkit-transform .3s ease-out',
  maxWidth: '500px',
  width: 'auto'
};

const Check2FA = ({ match, show, verify, onCancel, moveTwoFAState, args, resetTwoFA, data, currentUser }) => {
  const defaultUsersEmails = Object.values(fixtures.users).map(user => user.email);
  const isNewUser = currentUser && !currentUser.twoFAKey && !defaultUsersEmails.includes(currentUser.emailAddress());

  if (match.params.token) {
    moveTwoFAState(match.params.token);
    return null;
  } else if (!show) {
    return null;
  }

  if(isNewUser) {
    return (
      <div>
        <ModalRestrictedAccess isOpen={show} toggle={onCancel} />
      </div>
    );
  }

  if (data && data.type === 'withdrawal') {
    return (
      <div>
        <ModalWithdrawal2FA
          bgStyles={bgStyles}
          mainStyles={mainStyles}
          verify={verify}
          onCancel={onCancel}
          args={args}
          data={data}
          resetTwoFA={resetTwoFA}
          isNewUser={isNewUser}
        />
      </div>
    );
  }

  return (
    <div>
      <Modal2FA
        verify={verify}
        onCancel={onCancel}
        args={args}
        data={data}
        resetTwoFA={resetTwoFA}
        isNewUser={isNewUser}
      />
    </div>
  );
};

export default Check2FA;
