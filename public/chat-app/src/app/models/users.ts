import { Group } from './groups';

export class User{
  _id:Object;
  firstName:String;
  lastName:String;
  email:String;
  username:String;
  phoneNumber:String;
  password:String;
  bio:String;
  groups:Group[]
}
