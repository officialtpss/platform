import dotenv from 'dotenv';
import {Meteor} from 'meteor/meteor';
const path = require('path');

Meteor.rootPath = path.resolve('.');
Meteor.absoluteRootPath = Meteor.rootPath.split(path.sep + '.meteor')[0];

dotenv.config({path: Meteor.absoluteRootPath + '/.env'});
