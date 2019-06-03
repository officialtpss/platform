import React from 'react';
import Dropzone from 'react-dropzone';
import { PrimaryButton } from '../../../components/styled-components/Buttons'

const TwoFAKeyResetForm = ({ confirmTwoFAKeyReset, fileSaved, uploadFile }) => {
  return (
    <div>
      { fileSaved &&
        <div className="avatar-wrapper">
          <img src={ fileSaved[0].preview } alt="image preview" className="image-confirm" />
        </div>
      }
      { !fileSaved &&
        <div className="avatar-wrapper">
          <img src="/img/img-2fa-reset@2x.png" alt="image preview"/>
        </div>
      }
      <p>
        and upload it here.
      </p>
      <Dropzone onDrop={(accepted, rejected) => confirmTwoFAKeyReset(accepted)}
                accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png"
                multiple={false}
                className="dropzone-avatar"
      >
        <PrimaryButton sm className="upload-btn">
          <img src="/img/icons/ico-upload.png" alt="upload" height="24" width="24" />
          Upload photo
        </PrimaryButton>
      </Dropzone>

      <PrimaryButton onClick={() => uploadFile()}>Submit request</PrimaryButton>
    </div>
  )
};

export default TwoFAKeyResetForm;
