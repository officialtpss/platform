import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import {Row, Col, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {toastr} from 'react-redux-toastr';
import styled from 'styled-components';
import {LinkButton, PrimaryButton} from "../components/styled-components/Buttons";

const dropzoneStyle = {
  width: 220,
  height: 220,
  border: '2px dotted #a5acb5',
  borderRadius: 1,
  backgroundColor: '#fafbfc'
};

const CameraModal = styled(Modal)`
  z-index: 99;
  margin: 0;
  height: 100%;
  max-width: 100% !important;
  max-height: 100% !important;

  .modal-content {
    height: 100%;
    max-height: 100% !important;
    background-color: #29405e;

    .modal-header {
      background: none;

      .close > span {
        font-size: 50px;
        color: ${(props) => props.theme.colors.paleGrey};
      }
    }

    video {
      margin-top: -50px;
    }
  }
`;

const initialState = {
  showModalProvidingAccess: false,
  showModalCamera: false,
  snapshotWidth: 1944,
  snapshotHeight: 2592,
};


class renderDropzoneLivePhoto extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      ...initialState,
    };
  }

  componentWillMount() {
    window.addEventListener("orientationchange", this.setSnapshotSize);
  }

  componentWillUnmount() {
    window.removeEventListener('orientationchange', this.setSnapshotSize);
  }

  setSnapshotSize = () => {
    this.setState({
      snapshotWidth: screen.orientation.angle === 0 ? 1944 : 2592,
      snapshotHeight: screen.orientation.angle === 0 ? 2592 : 1944,
    });
  };

  toggleModalProvidingAccess = () => {
    this.setState({
      showModalProvidingAccess: !this.state.showModalProvidingAccess
    });
  };

  toggleModalCamera = () => {
    this.setState({
      showModalCamera: !this.state.showModalCamera
    });
  };

  getUserMedia = () => {
    this.toggleModalProvidingAccess();
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      this.toggleModalCamera();
      navigator.mediaDevices.getUserMedia({video: true}).then((stream)=>{
        const videoRender = document.getElementById("videoRender");
        const videoSaved = document.getElementById("videoSaved");
        // Older browsers may not have srcObject
        if ("srcObject" in videoRender) {
          videoRender.srcObject = stream;
          videoSaved.srcObject = stream;
        } else {
          // Avoid using this in new browsers, as it is going away.
          videoRender.src = window.URL.createObjectURL(stream);
          videoSaved.src = window.URL.createObjectURL(stream);
        }
        videoRender.play();
        videoSaved.play();
      }).catch((error)=>{
        this.toggleModalCamera();
        toastr.warning(error.message)
      });
    } else {
      return toastr.warning('Not supported by your browser to use the camera');
    }
  };

  snapshot = () => {
    const dataURLtoBlob = (dataURI) => {
      let byteString = atob(dataURI.split(',')[1]);
      let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      let ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ia], {type:mimeString});
      blob.lastModifiedDate = new Date();
      blob.name = 'livePhoto-'+new Date().valueOf();
      return blob;
    };

    // Get snapshot
    const video = document.getElementById("videoSaved");
    const canvas = document.getElementById("canvas");
    canvas.width = video.width;
    canvas.height = video.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, video.width, video.height);

    // Save snapshot
    const objectURL = canvas.toDataURL('image/png', 1.0);
    this.props.input.onChange([dataURLtoBlob(objectURL)]);

    this.toggleModalCamera();
  };


  render() {
    const {
      disabled = false, input, meta, initialPhoto, backgroundImage = '/img/img-user@2x.png',
      styles: dropBlockStyles = dropzoneStyle, name, acceptedFiles,
    } = this.props;
    const file = input.value[0];
    let fileURL;

    try{
      fileURL = (file && URL.createObjectURL(file));
    }catch (e) {
      fileURL = initialPhoto
    }

    const videoParams = screen.width > screen.height ?
      {
        height: screen.height / 2
      } : {
        width: screen.width / 1.4
      };

    const blockStyle = fileURL ?
      {
        backgroundImage: `url("${fileURL}")`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: 216
      } : {
        minHeight: 216
      };

    return (
      <Row className="m-t-10">
        <Col className="text-center d-flex justify-content-center">
          <Dropzone
            ref={ref => (dropzoneRef = ref)}
            name={name}
            onDrop={(filesToUpload) => {
              if (!filesToUpload.length) {
                return toastr.warning('File uploading failed. Please try again');
              }

              return input.onChange(filesToUpload)
            }}
            style={dropBlockStyles}
            disabled={disabled}
            accept={acceptedFiles}
            multiple={false}
          >
            <div className="text-center" onClick={(e) => e.stopPropagation()}>
              <div style={blockStyle}>
                {!fileURL &&
                <div className="p-t-40">
                  <img src={backgroundImage} className='backgroundImage' alt="upload" height="81" width="75" />
                </div>
                }
                { !disabled &&
                <div className="d-flex justify-content-between m-t-30 m-b-5" style={{position:'absolute', bottom: 0}}>
                  <div className="m-l-20 m-r-15">
                    <LinkButton sm type="button" className="text-center p-0" onClick={this.toggleModalProvidingAccess}>
                      <div className="m-b-10">
                        <img src="/img/icons/ico-camera.png" alt="upload" height="28" width="28"/>
                      </div>
                      <div>
                        USE Camera
                      </div>
                    </LinkButton>
                  </div>
                  <div className="m-r-20 m-l-15">
                    <LinkButton sm type="button" className="text-center p-0" onClick={()=> dropzoneRef.open()}>
                      <div className="m-b-10">
                        <img src="/img/icons/ico-upload.svg" alt="upload" height="28" width="28"/>
                      </div>
                      <div>
                        Upload file
                      </div>
                    </LinkButton>
                  </div>
                </div>
                }
              </div>
            </div>
          </Dropzone>
        </Col>

        {meta.touched && meta.error &&
        <Col xs={12} className="text-center">
          <span className="error">{meta.error}</span>
        </Col>
        }

        <Modal isOpen={this.state.showModalProvidingAccess} className="custom" toggle={this.toggleModalProvidingAccess}>
          <ModalHeader toggle={this.toggleModalProvidingAccess}>Take a photo</ModalHeader>
          <ModalBody>
            <div>
                Press the button to access the camera.
            </div>
            <div className="text-center m-t-30">
              <PrimaryButton type="button" onClick={this.getUserMedia}>
                Allow Populous to use my camera
              </PrimaryButton>
            </div>
          </ModalBody>
        </Modal>

        <CameraModal id="cameraModal" isOpen={this.state.showModalCamera} className="custom" toggle={this.toggleModalCamera}>
          <ModalHeader toggle={this.toggleModalCamera} />
          <ModalBody>
            <Row className="m-t-20">
              <Col xs={12} md={{size: 8, offset: 2}}>
                <div className="text-center">
                  <video id="videoRender" {...videoParams} />
                  <video loop muted id="videoSaved" width={this.state.snapshotWidth} height={this.state.snapshotHeight} style={{display: 'none'}} />
                  <canvas id="canvas" style={{display: 'none'}} />
                </div>
                <div className="text-center m-t-20">
                  <PrimaryButton id="b" type="button" style={{padding: '15px 40px'}} onClick={this.snapshot}>
                    <img src="/img/icons/ico-camera.svg" alt="upload" height="28" width="28"/>
                  </PrimaryButton>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </CameraModal>
      </Row>
    );
  }
}

renderDropzoneLivePhoto.propTypes = {
  acceptedFiles: PropTypes.string,
};

export default renderDropzoneLivePhoto;
