import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userRoles } from 'meteor/populous:constants';
import { Link } from 'react-router-dom';
import MaterialTitlePanel from './MaterialTitlePanel';
import { SidebarBody } from '../../../components/styled-components/Divs';

const styles = {
  sidebar: {
    width: 256,
    height: '100%',
    scroll: 'no',
    overflow: 'hidden'
  },
  sidebarLink: {
    display: 'block',
    padding: '5px 0px',
    color: 'white',
    textDecoration: 'none',
    outline: 'none'
  }
};

class SidebarContent extends React.Component {
  constructor(props) {
    super(props);
  }

  showName(){
    const user = this.props.currentUser;
    return user.role===userRoles.borrower
      ? user.companyName
        ? user.companyName
        :  user.firstName
      : user.firstName + "\n" + user.lastName;
  }

  render() {
    const style = this.props.style ? {...styles.sidebar, ...this.props.style} : styles.sidebar;
    const { isOpen, logout } = this.props;
    const avatar = this.props.currentUser.avatar();

    return (
      <MaterialTitlePanel title="" isOpen={isOpen} style={style} onSetOpen={(open)=>{
        this.props.onSetOpen(open);
      }} >
        <SidebarBody className="custom-sidebar">
          <div className="links-content">
            <div className="links">
              <div onClick={()=>{this.props.onSetOpen(false);}}>
                <Link to="/settings" style={styles.sidebarLink}><span>PROFILE SETTINGS</span></Link>
              </div>
              <div onClick={()=>{this.props.onSetOpen(false);}}>
                <Link to="/" style={styles.sidebarLink}><span>TUTORIALS</span></Link>
              </div>
              <div onClick={()=>{this.props.onSetOpen(false);}}>
                <Link to="/" style={styles.sidebarLink}><span>FAQ</span></Link>
              </div>
              <div onClick={()=>{this.props.onSetOpen(false);}}>
                <Link to="/" style={styles.sidebarLink}><span>PRIVACY POLICY</span></Link>
              </div>
              <div onClick={()=>{this.props.onSetOpen(false);}}>
                <Link to="/terms" style={styles.sidebarLink}><span>{"TERMS & CONDITIONS"}</span></Link>
              </div>
              <div onClick={()=>{this.props.onSetOpen(false);}}>
                <Link to="/" style={styles.sidebarLink}><span>SUPPORT</span></Link>
              </div>
            </div>
          </div>
          <div className="outer-links">
            <div className="avatar-content" onClick={()=>{}} >
              <div className="avatar-body">
                <div className="avatar">
                  { avatar
                    ? <img src={avatar.link()} height={30} />
                    : <img src="/img/icons/menu-user.png" height={30} />
                  }
                </div>
                <div className="name">
                  <span>{this.showName()}</span>
                </div>
              </div>
            </div>
            <div className="space"></div>
            <div className="logout" onClick={logout}>
              <img src="/img/icons/logout.png" height={30} />
            </div>
          </div>
        </SidebarBody>
      </MaterialTitlePanel>
    );
  }
}

SidebarContent.propTypes = {
  style: PropTypes.object,
};

export default connect()(SidebarContent);
