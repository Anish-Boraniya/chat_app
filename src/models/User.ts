import mongoose, { Document, models, model, Model } from 'mongoose';

export interface IUser extends Document {
    _id: String,
    firstname: String;
    lastname: String;
    email: String;
    phone: String;
    password: String;
    address: String;
  }

const userSchema = new mongoose.Schema({
    firstname: {type: String, },
    lastname: {type: String, },
    email: {type: String, unique: true},
    phone: {type: String, unique: true},
    password: {type: String, },
    address: {type: String, }
})

const User: Model<IUser> = models.User || model('User', userSchema);

export default User