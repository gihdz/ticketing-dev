import mongoose, {Document} from "mongoose";
import {Password} from "../services/password";

// An interface that describes the properties that are required o create a new User
interface UserAttrs {
    email: string,
    password: string;
}

// An interface that describes the properties that the User Model has
interface UserModel extends  mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc
}

// An interface that describes the properties that the User Document has
interface UserDoc extends Document {
    email: string;
    password: string;
}


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

UserSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

UserSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
})
const User = mongoose.model<UserDoc, UserModel>('User', UserSchema);


export {User}
