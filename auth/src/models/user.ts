import mongoose from "mongoose"
import { Password } from "../service/password"; 

// An interface that describes the prop required to create a User 

interface UserAttrs {
    email: string,
    password: string
}

// An interface that describes the prop that UserModel has 

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs) : UserDoc;  
}

// An interface that descibes prop that UserDocument has

interface UserDoc extends mongoose.Document {
    email: string, 
    password: string, 
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String, 
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id; 
            delete ret._id; 
            delete ret.password; 
            delete ret.__v /* versionKey: false */ 

        }
    }
}
); 

/* middleware executing callback before saving into db */
/* this in the cb refers to the document beeing save */

userSchema.pre('save', async function(done){       
    if (this.isModified('password')){
        const hashed = await Password.toHash(this.get('password')); 
        this.set('password', hashed); 
    }
    done(); 
})

// so typescript can check attrs type before build 

userSchema.statics.build = (attrs:UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

const user = User.build({
    email : "ojojojo", 
    password: "poojoj"
})



export { User }