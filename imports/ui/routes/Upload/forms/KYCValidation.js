/**
 * @param values, object that is seeded by the intitialValues
 * @param props, the same props that the entire form holds
 * @return object of errors
 */
const CompanyInformationValidateBorrower = (values) => {
  const errors = {};
  const {bankStatements} = values;

  if (!values.country) {
    errors.country = 'Required';
  }

  if (!values.companyNumber) {
    errors.companyNumber = 'Required';
  } else if (values.companyNumber.length > 20) {
    errors.companyNumber = 'Length has to be at most 20';
  }

  if (!values.employeeNumber) {
    errors.employeeNumber = 'Required';
  }

  if (!bankStatements || (bankStatements && bankStatements.length < 1)) {
    errors.bankStatements = 'Required';
  }

  if (values.country === 'GB') {
    return errors;
  }
  if (!values.companyName) {
    errors.companyName = 'Required';
  } else if (values.companyName.length > 70) {
    errors.companyName = 'Length has to be at most 70';
  }

  if (!values.companyDescription) {
    errors.companyDescription = 'Required';
  }

  if (!values.addressLine1) {
    errors.addressLine1 = 'Required';
  } else if (values.addressLine1.length > 70) {
    errors.addressLine1 = 'Length has to be at most 70';
  }
  if (values.addressLine2 && values.addressLine2.length > 70) {
    errors.addressLine2 = 'Length has to be at most 70';
  }
  if (!values.city) {
    errors.city = 'Required';
  }
  if (!values.postcode) {
    errors.postcode = 'Required';
  } else if (values.postcode.length > 10) {
    errors.postcode = 'Length has to be at most 10';
  }

  return errors;
};

const TradingVolumeValidateBorrower = (values) => {
  const errors = {};

  if (!values.currencySelector) {
    errors.currencySelector = 'Required';
  }

  return errors;
};

const PersonalIdentificationValidate = (values, props) => {
  const errors = {};
  const {personalIdentification, addressIdentification, livePhoto} = values;

  // For only borrowers
  if (props.currentUser.isBorrower() && !values.titlePosition) {
    errors.titlePosition = 'Required';
  }

  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Required';
  }
  if (!values.gender) {
    errors.gender = 'Required';
  }
  if (!values.residentalCountry) {
    errors.residentalCountry = 'Required';
  }
  if (!values.phoneNumber || !values.phoneAreaCode) {
    errors.phoneNumber = 'Required';
  }

  if (!values.idDocumentType) {
    errors.idDocumentType = 'Required';
  }
  if (!personalIdentification || (personalIdentification && personalIdentification.length < 1)) {
    errors.personalIdentification = 'Required';
  }

  if (!values.residentalAddressLine1) {
    errors.residentalAddressLine1 = 'Required';
  } else if (values.residentalAddressLine1.length > 70) {
    errors.residentalAddressLine1 = 'Length has to be at most 70';
  }
  if (values.residentalAddressLine2 && values.residentalAddressLine2.length > 70) {
    errors.residentalAddressLine2 = 'Length has to be at most 70';
  }
  if (!values.residentalCity) {
    errors.residentalCity = 'Required';
  } else if (values.residentalCity.length > 70) {
    errors.residentalCity = 'Length has to be at most 70';
  }
  if (!values.residentalPostcode) {
    errors.residentalPostcode = 'Required';
  } else if (values.residentalPostcode.length > 10) {
    errors.residentalPostcode = 'Length has to be at most 10';
  }

  if (!addressIdentification || (addressIdentification && addressIdentification.length < 1)) {
    errors.addressIdentification = 'Required';
  }

  if (!livePhoto || (livePhoto && livePhoto.length < 1)) {
    errors.livePhoto = 'Required';
  }

  if (values.companyName && values.companyName.length > 70) {
    errors.companyName = 'Length has to be at most 70';
  }
  if (values.companyNumber && values.companyNumber.length > 20) {
    errors.companyNumber = 'Length has to be at most 20';
  }

  return errors;
};

export {
  PersonalIdentificationValidate,
  CompanyInformationValidateBorrower,
  TradingVolumeValidateBorrower
};
