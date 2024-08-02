import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { data } = body;
  if (data == null) {
    return NextResponse.json(
      {
        is_success: false,
      },
      { status: 404 }
    );
  }
  const alphabets = [];
  const numbers = [];
  for (const item of data) {
    if ((item >= "a" && item <= "z") || (item >= "A" && item <= "Z")) {
      alphabets.push(item);
    } else {
      numbers.push(item);
    }
  }
  const newArr = [...alphabets];
  const highestAlphabet = newArr.sort();
  const response = {
    is_success: true,
    user_id: "jatin_chandok_10112003",
    email: "jr4560@srmist.edu.in",
    roll_number: "RA2111003030136",
    numbers: numbers,
    alphabets: alphabets,
    "highestAlphabet": highestAlphabet[highestAlphabet.length - 1],
  };
  return NextResponse.json(response, { status: 200 });
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      operation_code: 1,
    },
    {
      status: 200,
    }
  );
}
