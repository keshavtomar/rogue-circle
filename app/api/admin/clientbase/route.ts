import { NextResponse, NextRequest } from "next/server";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
  limit,
  startAfter,
  where,
} from "firebase/firestore";
import { clientBasePageSize } from "../../../admin/data";
import {decrementAppointmentCount} from "../utilities"

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
    await decrementAppointmentCount();

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

export async function POST(request: NextRequest) {
  try {
    const { searchTerm } = await request.json();

    if (!searchTerm) {
      return NextResponse.json({ message: "Search term is required" }, { status: 400 });
    }

    const clientCollectionRef = collection(db, "Appointments");

    const clientQuery = query(
      clientCollectionRef,
      where("name", "==", searchTerm),
    );

    const clientQuery2 = query(
      clientCollectionRef,
      where("phone","==",searchTerm)
    )

    const clientDataSnapshot = await getDocs(clientQuery);
    const data = clientDataSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const clientDataSnapshot2 = await getDocs(clientQuery2);
    const data2 = clientDataSnapshot2.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    data.push(...data2);

    if(data.length === 0){
     return NextResponse.json({message: "No data found", data: [], status:100});
    }

    return NextResponse.json({message:"success",data:data, status:200});
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message ,  status: 500 });
    }
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
