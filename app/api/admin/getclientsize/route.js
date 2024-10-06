import { NextResponse, NextRequest } from "next/server";
import { db } from "../firebase";
import { redirect } from "next/navigation";
import {
  collection,
  getDocs,
} from "firebase/firestore";

export async function GET() {
    const clientCollectionRef = collection(db, "Appointments");
    const data = await getDocs(clientCollectionRef);
    return NextResponse.json(data.size);
}