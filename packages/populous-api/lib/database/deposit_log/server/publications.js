import { publishComposite } from 'meteor/reywood:publish-composite';
import DepositLog from "../model";


publishComposite('depositLog.all', function () {
  return {
    find() {
      return DepositLog.find({});
    },
  }
});
