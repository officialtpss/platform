import React from 'react';
import { Document, Page } from 'react-pdf/build/entry.noworker';


const PdfPreview = ({ file, className, toggle, type }) => {
  return (
    <div className={className} onClick={toggle}>
      {type === "pdf" ?
        <Document file={file}>
          <Page className="custom" pageNumber={1} />
        </Document>
        :
        <div>
          <img src={file} alt="image preview" style={{width: '100%', height: '100%'}} />
        </div>
      }
      <div className="pdf-preview-overlay">
        <img src="/img/icons/ico-zoom-plus.png" height="20" className="icon" />
      </div>
    </div>
  );
};

export default PdfPreview;
