import Config from "../../config/model";


const key = 'lastBucketKey';

const lastBucketKeyService = {
  async saveOrUpdate(newValue) {
    const document = await Config.findOne({key}) || new Config({
      key,
      public: false
    });

    document.value = newValue;
    await document.save();
  },
  async getCurrent() {
    const document = await Config.findOne({key});

    return document ? document.value : undefined;
  },
};

export default lastBucketKeyService;
