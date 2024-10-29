import { addDoc, collection } from "firebase/firestore";
import {incrementAppointmentCount} from "../utilities"
import { NextRequest, NextResponse } from "next/server";

import { db } from "../firebase";


export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  try {
    const modifieddob =
      reqBody.dob.year + "-" + reqBody.dob.month + "-" + reqBody.dob.day;
    const appointment = {
      name: reqBody.name,
      dob: modifieddob,
      phone: reqBody.phone,
      selectedValue: reqBody.selectedValue,
      date: reqBody.date
    };
    if (
      !appointment.date ||
      !appointment.dob ||
      !appointment.name ||
      !appointment.phone ||
      !appointment.selectedValue
    ) {
      return NextResponse.json({
        message: "Some fields are empty",
        data: [],
        status: 100,
      });
    }

    const appointmentRef = collection(db, "Appointments");
    const result = await addDoc(appointmentRef, appointment);
    await incrementAppointmentCount();
    return NextResponse.json({status:200, message: "success", id: result.id });
  } catch (err) {
    console.log("Error in saving details: ", err);
    return NextResponse.json({status:401, message: "Something went wrong." });
  }
}
