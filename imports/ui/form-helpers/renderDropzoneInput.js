import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import {Fade, Row, Col} from 'reactstrap';
import {toastr} from 'react-redux-toastr';
import classnames from 'classnames';

import {P} from '../components/styled-components/Typography';
import {PrimaryButton} from '../components/styled-components/Buttons';

const dropzoneStyle = {};

class renderDropzoneInput extends React.Component {
  componentWillMount() {
    if (this.props.detail === 'personalIdentification') {
      this.props.setPropsPersonalIdentification(this.props.input.value);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.detail === 'personalIdentification' && this.props !== prevProps) {
      this.props.setPropsPersonalIdentification(this.props.input.value);
    }
  }

  removeFileFromFilesArray = (index) => {
    if (this.props.disabled) {
      return;
    }

    const stateFiles = this.props.input.value.slice(0);
    stateFiles.splice(index, 1);
    this.props.input.onChange(stateFiles);

    if (this.props.detail === 'personalIdentification') {
      this.props.setPropsPersonalIdentification(stateFiles);
    }
  };

  render() {
    const {hideDropzone} = this.props;
    const isPersonalIdentification = this.props.detail === 'personalIdentification';
    const files = this.props.input.value;
    let sameFileName;
    if (this.props.propsPersonalIdentification) {
      this.props.propsPersonalIdentification.forEach((file) => {
        if (files && files.length > 0) {
          sameFileName = files.find((item) => {
            return item.name === file.name;
          });
        }
      });
    }

    return (
      <Row className="m-t-10">
        {!hideDropzone && <Col className="text-center" xs={12}>
          <Dropzone
            name={this.props.name}
            onDrop={(filesToUpload) => {
              if (!filesToUpload.length) {
                return toastr.warning('File uploading failed. Please try again');
              }

              if (isPersonalIdentification && (files.length === 2 || (files.length + filesToUpload.length) > 2)) {
                return toastr.warning('You can upload only 2 documents: document front image and document back image');
              }
              if (isPersonalIdentification) {
                return this.props.input.onChange(filesToUpload.concat(files))
              } else {
                return this.props.input.onChange(filesToUpload)
              }
            }}
            onDropRejected={(filesToUpload) => {
              if (filesToUpload.length) {
                if (this.props.maxSize) {
                  filesToUpload.forEach(file => {
                    if (file.size > this.props.maxSize) {
                      return toastr.warning('Maximum file size must be 3MB. Please select other');
                    }
                  });
                }

                if (this.props.minSize) {
                  filesToUpload.forEach(file => {
                    if (file.size < this.props.minSize) {
                      return toastr.warning('Minimum file size must be 15Kb. Please select other');
                    }
                  });
                }
              }
            }}
            style={{dropzoneStyle}}
            disabled={this.props.disabled || false}
            accept={this.props.acceptedFiles}
            multiple={isPersonalIdentification}
            minSize={this.props.minSize}
            maxSize={this.props.maxSize}
          >
            {!hideDropzone &&
            <PrimaryButton type="button" style={{padding: '12px 20px'}} disabled={this.props.disabled}>
              <img src="/img/icons/ico-upload.png" alt="upload" height="24" width="24" className="m-r-10"/>
              Upload document
            </PrimaryButton>}
          </Dropzone>
          {this.props.meta.touched &&
          this.props.meta.error &&
          <span className="error">{this.props.meta.error}</span>}
        </Col>
        }
        <Col xs={12} className={!hideDropzone ? "m-t-30" : ''}>
          <Fade className="col" in={files.length > 0}>
            {files &&
            Array.isArray(files) &&
            files.map((file, i) =>
              <Row
                className={classnames(`border-row p-t-10 p-b-10`, {bottomless: files.length !== (i + 1)})}
                key={i}>
                <Col xs={10}>
                  <P>
                    <img src="/img/icons/ico-check.png" height={22}/>
                    {` ${file.name} `}
                  </P>
                </Col>
                {!this.props.disabled && <Col xs={2} className="text-right">
                  <a href="javascript:;" onClick={e => this.removeFileFromFilesArray(i)}>
                    <img src="/img/icons/delete.png" height={22}/>
                  </a>
                </Col>}
              </Row>
            )}
          </Fade>

          {!hideDropzone &&
          <Fade className="col" in={!!sameFileName}>
            <Row className="p-t-5 p-b-5">
              <Col className="p-0">
                <P cool>
                  It seems like you uploaded the same file twice. Please ensure that there is no mistake.
                </P>
              </Col>
            </Row>
          </Fade>
          }
        </Col>
      </Row>
    );
  }
}

renderDropzoneInput.propTypes = {
  acceptedFiles: PropTypes.string,
};

export default renderDropzoneInput;
