import { NextResponse } from "next/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase"; // adjust the path to your firebase config
import { ClientTypes } from "@/app/types";

export async function GET() {
  try {
    const today = new Date();
    const todayMonth = today.getMonth()+1;
    const todayDay = today.getDate();

    const colRef = collection(db, "Appointments");

    const querySnapshot = await getDocs(colRef);
    const data: any[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const todayBirthdayDocs = data.filter((item:ClientTypes)=>{
        return parseInt(item.dob.split("-")[1])===todayMonth && parseInt(item.dob.split("-")[2])===todayDay;
    })

    if(todayBirthdayDocs.length===0) {
      return NextResponse.json({message: "No birthdays today", data: [], status: 100});
    }

    return NextResponse.json({message: "success", data: todayBirthdayDocs, status: 200});
  } catch (error) {
    if(error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 500 });
    }
  }
}
