import { NextResponse, NextRequest } from "next/server";
import { db } from "../../firebase";
import { collection, getDocs} from "firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    const { searchTerm } = await request.json();

    if (!searchTerm) {
      return NextResponse.json(
        { message: "Search term is required" },
        { status: 400 }
      );
    }

    const clientCollectionRef = collection(db, "Appointments");

    const querySnapshot = await getDocs(clientCollectionRef);
    const data: any[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filteredData = data.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    if (filteredData.length === 0) {
      return NextResponse.json({
        message: "No data found",
        data: [],
        status: 100,
      });
    } else if (filteredData.length >= 50) {
      return NextResponse.json({
        message: "Too large data, consider searching via phone number",
        data: [],
        status: 100,
      });
    }

    return NextResponse.json({
      message: "success",
      data: filteredData,
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 500 });
    }
    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
