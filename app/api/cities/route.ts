import { NextResponse, type NextRequest } from "next/server";
import { cities } from "../database/cities";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  console.log('query', query)

  if (query && query !== 'undefined') {
    const sanitizedQuery = query.replace(/\s/g, '');

    const lowercaseQuery = sanitizedQuery.toLowerCase(); 

    const matchingCities = cities.filter((city) => {
      const sanitizedCityName = city.name.replace(/\s/g, '').toLowerCase();
      return sanitizedCityName.includes(lowercaseQuery);
    });

    if (matchingCities.length > 0) {
      return NextResponse.json({ cities: matchingCities }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: `محله ${query} یافت نشد!`},
        { status: 404 }
      );
    }
  }

  return NextResponse.json({ cities }, { status: 200 });
}

