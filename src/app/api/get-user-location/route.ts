import "dotenv/config";
import { NextRequest, NextResponse } from "next/server";



export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Store your API key in .env.local
  const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        considerIp: true, // Optionally use IP-based geolocation
      }),
    });
    // console.log(response);
    // if (!response.ok) {
    //   throw new Error('Failed to fetch geolocation data');
    // }

    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}