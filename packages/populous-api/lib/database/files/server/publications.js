import File from '../model';

// Publish the file content
Meteor.publish('files.one', function(fileId) {
  return File.find({ _id: fileId }).cursor;
});
