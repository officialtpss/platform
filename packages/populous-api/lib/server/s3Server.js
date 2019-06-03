import S3 from 'aws-sdk/clients/s3';

const s3Instance = new S3({
  secretAccessKey: process.env.S3_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: process.env.S3_REGION,
  // sslEnabled: true, // optional
  httpOptions: {
    timeout: 6000,
    agent: false
  }
});

const getOptions = (file) => {
  let path;
  if (file && file.versions && file.versions['original'] &&
    file.versions['original'].meta && file.versions['original'].meta.pipePath) {
    path = file.versions['original'].meta.pipePath;

    return {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: path
    };
  }

  return null;
};

export {
  s3Instance,
  getOptions
};
