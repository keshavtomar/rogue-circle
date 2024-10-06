import { NextResponse } from "next/server";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET() {
    const statsRef = doc(db, "stats", "1");

    const statsSnapshot = await getDoc(statsRef);

    if (statsSnapshot.exists()) {
        return NextResponse.json(statsSnapshot.data());
    } else {
        return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }
}
