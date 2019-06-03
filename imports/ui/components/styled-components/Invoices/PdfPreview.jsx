import styled from 'styled-components';
import PdfPreviewComponent from '../../../routes/Invoice/components/ViewInvoice/PdfPreview';

const PdfPreview = styled(PdfPreviewComponent)`
  position: relative;
  border: 1px solid ${props => props.theme.colors.darkGrey};
  overflow: hidden;
  min-height: 300px;

  .ReactPDF__Document {
    user-select: none;
  }

  .pdf-preview-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: none;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.5);
    cursor: pointer;

    .icon {
      color: #fff;
      font-size: 32px;
    }
  }
  &:hover {
    .pdf-preview-overlay {
      display: flex;
    }
  }
`;

export default PdfPreview;
