import { NextResponse, NextRequest } from "next/server";
import { db } from "../firebase";
import { redirect } from "next/navigation";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
  limit,
  startAfter,
} from "firebase/firestore";
import { clientBasePageSize } from "../../../admin/data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    let pageNumber = Number(page);

    // Validate the page number
    if (isNaN(pageNumber) || pageNumber < 1) {
      return NextResponse.json(
        { message: "Invalid page number" },
        { status: 400 }
      );
    }

    const clientCollectionRef = collection(db, "Appointments");

    // Initial query to get the first page
    let clientQuery = query(
      clientCollectionRef,
      orderBy("date", "desc"),
      limit(clientBasePageSize)
    );

    if (pageNumber > 1) {
      // Fetch the last document from the previous page
      const previousPageQuery = query(
        clientCollectionRef,
        orderBy("date", "desc"),
        limit((pageNumber-1) * clientBasePageSize) // Get the previous documents,
      );

      const previousPageSnapshot = await getDocs(previousPageQuery);
      const lastDoc =
        previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];

      if (lastDoc) {
        clientQuery = query(
          clientCollectionRef,
          orderBy("date", "desc"),
          startAfter(lastDoc), // Start after the last document
          limit(clientBasePageSize) // Limit to the next 20 documents
        );
      }
      else{
        return NextResponse.json({message: "No data found", data: []});
      }
    }

    const clientDataSnapshot = await getDocs(clientQuery);
    const data = clientDataSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if(data.length === 0){
     return NextResponse.json({message: "No data found", data: []});
    }

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    console.log(id);

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const docRef = doc(db, "Appointments", id);
    await deleteDoc(docRef);

    return NextResponse.json({ message: "Client Deleted" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
