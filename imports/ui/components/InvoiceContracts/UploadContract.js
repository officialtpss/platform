import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import {Alert, FormText, UncontrolledAlert, UncontrolledTooltip} from 'reactstrap';
import {Document, Page} from 'react-pdf/build/entry.noworker'
import PdfReview from '../../components/PdfReview';

import {LinkText} from '../../components/styled-components/Typography';
import {
  invoiceDocumentTypes,
} from 'meteor/populous:constants';
import TrashIcon from "../Icons/TrashIcon";
import ZoomInIcon from "../Icons/ZoomInIcon";
import UploadIcon from "../Icons/UploadIcon";

const dropzoneStyle = {
  posistion: 'relative',

  cursor: 'pointer',
  backgroundColor: '#fafbfc',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const iconStyle = {
  height: 100,
  marginBottom: 10
};

const UploadContractStyled = styled.div`
  max-width: ${props =>  !props.viewStyles ? '200px' : '100%'};
  margin: 0 auto;
  width: 100%;
`;

const PDFDocument = styled.div`
  width: 100%;
  cursor: pointer;
  border-style: solid;
  border-color: ${
    ({theme:{colors: {black}, newColors: {lightGray}}, viewStyles}) => 
      viewStyles ? black: lightGray
  };
  border-width: ${
  ({viewStyles}) =>
    viewStyles ? 1: 2
  }px;
  
  text-align: center;
  position: relative;

  .file-name{
    display: ${
    ({viewStyles}) =>
      viewStyles ? 'none': undefined
    };
    background: ${props => props.theme.colors.white};
    text-align: left;
    padding: 6px;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    color: ${props => props.theme.colors.coolGrey};
    font-size: 12px;
    
    .inner{
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .document-overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    background-color: rgba(41, 64, 94, .7);
    display: none;
    
    > *{
      margin-right: 20px;
      
      &:last-child{
        margin-right: 0;
      }
      
      &:hover{
        opacity: .7;
      }
    }
  }
  
  .ReactPDF__Page__textContent {
    position: relative !important;
    height: 100% !important;
    
    div {
      display: none;
    }
  }

  &:hover {
    .document-overlay {
      display: flex;
      z-index: 1;
    }
  }
`;

const UploadContract =
  ({
  upload, rejectedFile, savedFile, downloadedContract, fileType, removeDocument, oldFile, disabled,
  pdfReviewModal, togglePdfReviewModal, isProvider, showRequirements = false, linkText = 'UPLOAD HERE', className = '',
     viewStyles, allowReplace,
   }) => {
  const uploadWrapper = (acceptedFiles, rejectedFiles) => {
    upload(acceptedFiles, rejectedFiles, fileType);
  };

  const onRemoveFile = typeof removeDocument === 'function' && ((e) => {
    e.preventDefault();
    e.stopPropagation();
    removeDocument(fileType);
  });

  const onReviewFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    togglePdfReviewModal(fileType);
  };

  const currentFile = savedFile || oldFile;

  return (
    <UploadContractStyled className={className} viewStyles={viewStyles}>
      <Dropzone onDrop={uploadWrapper}
                accept=".pdf, .png, .jpg, .jpeg"
                maxSize={2097152}
                style={{...dropzoneStyle,
                  border: currentFile ? 'none' : '2px dashed #A5ACB5',
                  minHeight: currentFile ? '0' : '300px'
                }}
                disabled={(!downloadedContract && !isProvider && fileType !== invoiceDocumentTypes.invoice) || disabled}>
        {!currentFile
          ? <React.Fragment>
            <img src="/img/img-contract-icon.png" style={iconStyle}/>
            <div className="text-center">
              <LinkText>{linkText}</LinkText>
            </div>
          </React.Fragment>
          :
          <PDFDocument viewStyles={viewStyles}>
            {(currentFile && currentFile.extension === 'pdf')
              ? <Document file={(typeof currentFile.link === 'function') ? currentFile.link() : savedFile }>
                <Page className="custom" pageNumber={1}/>
              </Document>
              : <div>
                <img src={(typeof currentFile.link === 'function')
                  ? currentFile.link()
                  : URL.createObjectURL(currentFile)}
                     alt="image preview" style={{width: '100%', height: '100%'}}/>
              </div>
            }
            {currentFile &&
            <div className={'file-name'}>
              <div className={'inner'}>
                {currentFile.name}
              </div>
            </div>
            }
            <div className="document-overlay">
              {togglePdfReviewModal &&  <ZoomInIcon onClick={onReviewFile} />}
              {!disabled && <Fragment>

              { typeof onRemoveFile === 'function' && <TrashIcon onClick={onRemoveFile} color={'#fff'}/>}
              {allowReplace && <UploadIcon/>}
              </Fragment>}
            </div>
          </PDFDocument>
        }
      </Dropzone>
      {rejectedFile &&
      <UncontrolledAlert color="danger">
        <div><b>{rejectedFile.name}</b> isn't the right format.</div>
        <div>File requirements:</div>
        <div>File format: pdf, jpg, png</div>
        <div>Max. file size: 2Mb</div>
        <div>Min. dimensions of a scanned image: 1000 x 1000px</div>
      </UncontrolledAlert>
      }

      {showRequirements && <div className="m-t-10">
        <div className="m-b-10" id="baseTooltip">
          <FormText color="muted">
            <img src="/img/icons/ico-info.png" alt="Info" className="m-r-10"/>
            <span>File requirements</span>
          </FormText>
        </div>
        <UncontrolledTooltip className='tooltip-custom p-l-10 p-r-20' placement="top-start" target="baseTooltip"
                             style={{maxWidth: '400px'}} autohide={false}>
          <div>File format: pdf, jpg, png</div>
          <div>Max. file size: 2Mb</div>
          <div>Min. dimensions of a scanned image: 1000 x 1000px</div>
          <div className="m-t-10">Please make sure that entire text is clear and legible</div>
        </UncontrolledTooltip>
      </div>
      }

      {(pdfReviewModal && pdfReviewModal[fileType]) && (currentFile) &&
      <PdfReview file={(typeof currentFile.link === 'function') ? currentFile.link() : URL.createObjectURL(currentFile)}
                 close={togglePdfReviewModal}/>
      }
    </UploadContractStyled>
  )
};

export default UploadContract;
