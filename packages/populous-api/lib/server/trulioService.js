import axios from "axios/index";


const buff = new Buffer(`${process.env.truliooUsername}:${process.env.truliooPassword}`);
const base64data = buff.toString('base64');

const trulioService = axios.create({
  baseURL: 'https://api.globaldatacompany.com',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + base64data
  }
});

trulioService.verifyUser = function(requestData){
  return this.post('/verifications/v1/verify', requestData);
};

trulioService.getUserRecord = function(transactionRecordID){
  return this.get(`/verifications/v1/transactionrecord/${transactionRecordID}`);
};

export default trulioService;
