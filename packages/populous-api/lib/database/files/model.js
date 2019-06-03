import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import SimpleSchema from 'simpl-schema';

const fileSchema = {
  ...FilesCollection.schema,
  verified: {
    type: Boolean,
    defaultValue: false
  }
};

const File = new FilesCollection({
  collectionName: 'files',
  schema: fileSchema,
  storagePath: process.env.UPLOAD_FILES_PATH || '/uploads/files',
  allowClientCode: true, // Disallow remove files from Client
  debug: false,
  downloadCallback(fileObj) {
    if (this.params.query.download == 'true') {
      // Increment downloads counter
      File.update(fileObj._id, {$inc: {'meta.downloads': 1}});
    }
    // Must return true to continue download
    return true;
  },
  onAfterUpload(fileObj) {
    return true;
  }
});

File.collection.attachSchema(new SimpleSchema(fileSchema));

if (Meteor.isServer) {
  File.allow({
    insert() {
      // add custom authentication code here
      return true;
    },
    update() {
      return true;
    },
    remove() {
      return true;
    },
  });
}

export default File;
