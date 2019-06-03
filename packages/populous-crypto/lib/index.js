import crypto from 'crypto';

// Must be 32 characters
// TODO: This is temporary! This must come from the node ENV!
const ENCRYPTION_KEY = 'nGbLA*0oXJ&&Lhw1#UWmH$*Lj0FJI_Mn';

/*
 * This file has functions for encryption and decryption.
 * Encryption/decyption is done using the AES-256 in CTR mode.
 */

const IV_LENGTH = 16; // For AES, this is always 16

/*
 * `encrypt` takes a string of data and returns an object
 * with two properties, `iv` and `string`. The `iv` prop is
 * the random initialisation vector used for this round of
 * encryption. The `string` prop contains the actual encrypted
 * data.
 */
const encrypt = data => {

  // Generate a new initialisation vector
  const iv = crypto.randomBytes(IV_LENGTH);

  // Create the cipher using our constant encryption key and new iv
  const cipher = crypto.createCipheriv(
    'aes-256-ctr',
    new Buffer(ENCRYPTION_KEY),
    iv
  );

  // Push our data into the cipher
  const cipherWithData = cipher.update(data);

  // Make sure we have all of the encrypted data from the cipher
  const encrypted = Buffer.concat([cipherWithData, cipher.final()]);

  // Return the IV and encryted string
  // Decode the buffers to hexadecimal strings
  return {
    iv: iv.toString('hex'),
    string: encrypted.toString('hex')
  };
};

/*
 * `decrypt` is the reverse of the `encrypt` function.
 * It takes a string of hexadecimal encryted data and the
 * IV used to encrypt it, and returns the decrypted string.
 */
const decrypt = (dataHex, ivHex) => {

  // De-hex the encryted string and iv
  const data = new Buffer(dataHex, 'hex');
  const iv = new Buffer(ivHex, 'hex');

  // Create the decipher using our constant encryption key and iv
  const decipher = crypto.createDecipheriv(
    'aes-256-ctr',
    new Buffer(ENCRYPTION_KEY),
    iv
  );

  // Push our data into the decipher
  const decipherWithData = decipher.update(data);

  // Make sure we have all of the decrypted data from the decipher
  const decrypted = Buffer.concat([decipherWithData, decipher.final()]);

  // Decode the buffer to a utf8 string
  return decrypted.toString();
};

export {
  encrypt,
  decrypt
};
