import mongoose from "mongoose";
const schema = mongoose.Schema;
import bcrypt from 'bcrypt';
 
const userSchema = new schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: "default.webp"
    },
    role:{
        type: String,
        default: "user"
    },
    bookedAppointments: [
            {
              date: String,
              time: String,
              doctor: String,
              doctorId: String
            }
          ],
          default: [],
}, { timestamps: true });

userSchema.pre("save", async function hashPassword(next){
    const user = this;
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword
})

const userModel = mongoose.model('user', userSchema);
export default userModel;