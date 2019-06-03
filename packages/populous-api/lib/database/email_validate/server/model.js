import EmailValidate from '../model';
import User from '../../accounts/model';
import checkAuth from '../../helpers/checkAuth';
import {ForbiddenError} from "../../helpers/Errors";


EmailValidate.extend({
  meteorMethods: {
    async removeEmailValidate() {
      const userId = checkAuth();
      const user = await User.findOne(userId);

      if(!user.isAdmin()) {
        throw ForbiddenError;
      }

      await this.remove();
    },

    async saveEmailValidate(subject, url) {
      const userId = checkAuth();
      const user = await User.findOne(userId);

      if(!user.isAdmin()) {
        throw ForbiddenError;
      }

      this.subject = subject.trim();
      this.url = url.trim();
      this.save();

      return this;
    },
  }
});
