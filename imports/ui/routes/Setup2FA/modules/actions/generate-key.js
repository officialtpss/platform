import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { toastr } from 'react-redux-toastr';

import {
  SET_2FA_KEY,
} from '../';

// This thunk generates a random 2-factor auth secret
// and sets the key and authURL
const generateKey = () => {
  return dispatch => {
    const secret = speakeasy.generateSecret({
      length: 20,
      name: 'Populous'
    });

    // create QR code data uri
    QRCode.toDataURL(secret.otpauth_url, (err, img) => {
      if (err) {
        toastr.error(
          'Error',
          'There was an issue creating your key. Please try again'
        );
        return;
      }

      dispatch({
        type: SET_2FA_KEY,
        secret: { string: secret.hex, base: secret.base32, img }
      });
    });
  };
};

export default generateKey;
