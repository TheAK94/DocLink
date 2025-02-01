import mongoose from "mongoose";
const schema = mongoose.Schema;
 
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
    profilePicture: {
        type: String,
        default: ""
    },
    role:{
        type: String,
        default: "user"
    },
    bookedAppointments: [
            {
              slot: String,
              doctor: String,
            }
          ],
          default: [],
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);
export default userModel;