import TermsAndConditions from '../model';
import User from '../../accounts/model';
import checkAuth from '../../helpers/checkAuth';
import {ForbiddenError} from "../../helpers/Errors";


TermsAndConditions.extend({
  meteorMethods: {
    async removeSection(id) {
      const userId = checkAuth();
      const user = await User.findOne(userId);

      if(!user.isAdmin()) {
        throw ForbiddenError;
      }

      const targetSection = TermsAndConditions.findOne(id);
      const currentVersion = targetSection.getCurrentVersion();

      await targetSection.remove();

      // Update position for other sections
      const sections = await TermsAndConditions.find({position: {$gte: targetSection.position}}).fetch();
      if (sections.length) {
        sections.forEach((section)=>{
          --section.position;
          section.version = currentVersion + 1;
          section.save();
        })
      }
    },

    async saveSection({position, heading, body}, isNewSection, isUpdatedPosition, isIncremetPosition) {
      const userId = checkAuth();
      const user = await User.findOne(userId);

      if(!user.isAdmin()) {
        throw ForbiddenError;
      }

      // Update position for other sections
      let condition = {};
      if (isNewSection) {
        condition.position = {$gte: position};
      } else if (isIncremetPosition) {
        condition = {$and:
          [
            {position: {$lte: position}},
            {position: {$gt: this.position}}
          ]
        };
      } else {
        condition = {$and:
          [
            {position: {$gte: position}},
            {position: {$lt: this.position}}
          ]
        };
      }

      if (isUpdatedPosition) {
        const sections = await TermsAndConditions.find(condition).fetch();

        if (sections.length) {
          sections.forEach((section)=>{
            if (isIncremetPosition) {
              --section.position;
            } else {
              ++section.position;
            }

            section.save();
          })
        }
      }

      this.position = position;
      this.title = heading;
      this.content = body;
      this.version = this.getCurrentVersion() + 1;
      this.save();

      return this;
    },
  },
});
