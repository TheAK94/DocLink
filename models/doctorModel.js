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
        required: false
    },
    address:{
        type: String,
        required: false,
        default: "Star Hospital, 13th Street, New York"
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
    openSlots:{
        type: Array,
        default: [],
    },
    bookedSlots:[
        {
          slot: String,
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