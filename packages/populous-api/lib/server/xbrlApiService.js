import axios from 'axios';

const xbrApiService = {
  getCompanyInfo(companyNumber) {
    return axios.get(process.env.XBRL_API,
      {
        params: {
          company_number: companyNumber,
        }
      }
    );
  }
};

export default xbrApiService;
