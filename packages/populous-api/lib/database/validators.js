import { Validator } from 'meteor/jagi:astronomy';
import {invoiceDocumentTypes} from 'meteor/populous:constants';

// This validator makes sure the date selected
// is in the future
Validator.create({
  name: 'futureDate',
  isValid({ value, doc }) {
    const date = doc.createdAt ?
      new Date(doc.createdAt) :
      new Date();
    return value > date;
  },
  resolveError({ name }) {
    return `"${name}" has to be in the future`;
  }
});

// This validator for invoice documents
Validator.create({
  name: 'invoiceDocuments',
  isValid({ value, doc }) {
    const acceptableDocumentTypes = Object.values(invoiceDocumentTypes);

    return Object.keys(value).every(invoiceDocType => acceptableDocumentTypes.includes(invoiceDocType));
  },
  resolveError({ name }) {
    return 'All documents should be uploaded';
  }
});

// This validator makes sure the price given
// is less than the `amount` of the invoice
Validator.create({
  name: 'ltAmount',
  isValid({ value, doc }) {
    return value < doc.amount;
  },
  resolveError({ name }) {
    return `"${name}" must be lower than the "amount"`;
  }
});

// This validator makes sure that a String
// value only contains numeric characters
Validator.create({
  name: 'onlyNumbers',
  isValid({ value }) {

    // If empty string, let it through
    if (!value.trim()) {
      return true;
    }

    // Check for only numbers
    return /^\d+$/.test(value);
  },
  resolveError({ name }) {
    return `"${name}" must only contain numeric values`;
  }
});

// Check to unique
Validator.create({
  name: 'unique',
  isValid({ doc, name, value }) {
    if (!doc._isNew) {
      return true;
    }

    const Class = doc.constructor;

    return Class.find({ [name]: value }, { limit: 1 }).count() === 0;
  },
  resolveError(params) {
    return `Cannot save ${params.className.toLowerCase()} with already existing "${params.name}"`;
  }
});
