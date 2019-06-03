import React from 'react';
import Dropzone from 'react-dropzone';
import { Alert } from 'reactstrap';
import { LinkText } from '../../../../components/styled-components/Typography/index';
import { Document, Page } from 'react-pdf/build/entry.noworker';

const dropzoneStyle = {
  width: '100%',
  height: '320px',
  cursor: 'pointer',
  border: '2px dashed #A5ACB5',
  backgroundColor: '#fafbfc',
  posistion: 'relative',
  textAlign: 'center'
};

const dropzoneNoBorderStyle = {
  width: '100%',
  height: '320px',
  cursor: 'pointer',
  backgroundColor: '#fafbfc',
  posistion: 'relative',
  textAlign: 'center'
};

const dropzoneStyle_mobile = {
  width: '100%',
  height: '150px',
  cursor: 'pointer',
  border: '2px dashed #A5ACB5',
  posistion: 'relative',
  textAlign: 'center'
};

const dropzoneNoBorderStyle_mobile = {
  width: '100%',
  height: '150px',
  cursor: 'pointer',
  border: '2px dashed #A5ACB5',
  posistion: 'relative',
  textAlign: 'center'
};

const resultStyle = {
  cursor: 'pointer',
  border: '2px solid #A5ACB5',
  posistion: 'relative',
  textAlign: 'center'
};

const iconStyle = {
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto'
};

const iconStyle_mobile = {
  position: 'relative',
  top: '20%',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto'
};

const btnStyle = {
  position: 'relative',
  top: 'calc(100% - 120px)',
  transform: 'translateY(-50%)'
};

const btnStyle_mobile = {
  position: 'relative',
  top: '43%',
  lineHeight: 1,
  fontSize: '13px'
};

const UploadContract = ({ upload, rejectedFile, uploadedContract, downloadedContract, mobileView }) => {
  return <div>
    {!uploadedContract && !mobileView &&
      <Dropzone onDrop={upload} accept=".pdf" style={dropzoneStyle} disabled={!downloadedContract}>
        <img src="/img/img-contract-icon.png" height={100} style={iconStyle} />
        <div className="text-center" style={btnStyle}>
          <LinkText>UPLOAD SIGNED CONTRACT</LinkText>
        </div>
      </Dropzone>
    }
    {!uploadedContract && mobileView &&
      <Dropzone onDrop={upload} accept=".pdf" style={dropzoneStyle_mobile} disabled={!downloadedContract}>
        <img src="/img/img-contract-icon.png" height={50} style={iconStyle_mobile} />
        <div className="text-center" style={btnStyle_mobile}>
          <LinkText>UPLOAD SIGNED CONTRACT</LinkText>
        </div>
      </Dropzone>
    }
    {uploadedContract && !mobileView &&
      <Dropzone onDrop={upload} accept=".pdf" style={dropzoneNoBorderStyle} disabled={!downloadedContract}>
        <div style={resultStyle}>
          <Document file={uploadedContract}>
            <Page className="custom" pageNumber={1} />
          </Document>
        </div>
      </Dropzone>
    }
    {uploadedContract && mobileView &&
      <Dropzone onDrop={upload} accept=".pdf" style={dropzoneNoBorderStyle_mobile} disabled={!downloadedContract}>
        <div style={resultStyle}>
          <Document file={uploadedContract}>
            <Page className="custom" pageNumber={1} />
          </Document>
        </div>
      </Dropzone>
    }
    {rejectedFile &&
      rejectedFile.name.includes('.pdf') &&
      <Alert color="danger">
        <b>{rejectedFile.name}</b> isn't the right format,
          please upload your invoice as a PDF.
      </Alert>}
  </div>
};

export default UploadContract;
