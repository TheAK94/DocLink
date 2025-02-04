import mongoose from "mongoose";
const schema = mongoose.Schema;
 
const doctorSchema = new schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    speciality: {
        type: String,
        required: false,
        default: "None"
    },
    address:{
        type: String,
        required: false,
        default: "Star Hospital, 13th Street, New Delhi"
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: false,
        default: 0
    },
    profilePicture: {
        type: String,
        default: ""
    },
    openSlots:[
        {
          date: String,
          time: String,
        }
      ],
    bookedSlots:[
        {
          date: String,
          time: String,
          user: String,
        }
      ],
    role:{
        type: String,
        default: "doctor"
    },
}, { timestamps: true });

const doctorModel = mongoose.model('doctor', doctorSchema);
export default doctorModel;