import SIC from '../model';
import codes from './codes';

SIC.extend({
  meteorMethods: {
    async importCodes() {
      const enabledCountries = [
        'GB',
      ];

      enabledCountries
        .forEach(async (countryCode) => {
          const countryCodesCount = await SIC
            .find({ country: countryCode })
            .count();

          const codesForCountry = codes[countryCode];

          if (!countryCodesCount && codesForCountry) {
            for (const sicCode in codesForCountry) {
              if (codesForCountry.hasOwnProperty(sicCode)) {
                const sicCodeObject = codesForCountry[sicCode];

                await SIC.insert({
                  country: countryCode,
                  code: sicCode,
                  ...sicCodeObject,
                });
              }
            }
          }
        });
    }
  },
});
