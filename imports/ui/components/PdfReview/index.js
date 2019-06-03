import React from 'react';

const PdfReview = ({ file, close }) => {
  return (
    <div className="pdf-review-wrapper">
      <div className="pdf-review-overlay" onClick={() => close()} ></div>
      <img src="/img/icons/ico-cross.svg" className="pdf-review-close-icon" onClick={() => close()} />
      <div className="pdf-review-content">
        <embed width="100%" height="100%" src={`${file}#toolbar=0&navpanes=0&scrollbar=0`} />
      </div>
    </div>
  );
};

export default PdfReview;
