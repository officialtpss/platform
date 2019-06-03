import {toastr} from 'react-redux-toastr';
import {
  User,
} from 'meteor/populous:api';

const reset2faByLink = ({match, history}) => {
  if(User){
    new User().callMethod('checkTwoFAToken', match.params.token, (err, result) => {
      if(!err){
        toastr.error('Success!', '2-fa authorization reseted');
        history.push('/');
      }
    });
  }

  return true;
}

export default reset2faByLink;