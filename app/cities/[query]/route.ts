import { createLinkFromText } from "@/utils/createLinkFromText";
import { NextResponse } from "next/server";
import data from "polskie-miejscowosci";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ query: string }> }
) {
  const query = (await params).query;
  const cities = data
    .filter((city) =>
      createLinkFromText(city.Name).includes(query.toLowerCase())
    )
    .sort((a, b) => {
      const aDistance = levenshteinDistance(
        createLinkFromText(a.Name),
        query.toLowerCase()
      );
      const bDistance = levenshteinDistance(
        createLinkFromText(b.Name),
        query.toLowerCase()
      );
      return aDistance - bDistance;
    });

  function levenshteinDistance(a: string, b: string): number {
    const m = a.length;
    const n = b.length;
    const d: number[][] = Array(m + 1)
      .fill(0)
      .map(() => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) {
      d[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
      d[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        d[i][j] = Math.min(
          d[i - 1][j] + 1,
          d[i][j - 1] + 1,
          d[i - 1][j - 1] + cost
        );
      }
    }

    return d[m][n];
  }
  return NextResponse.json(cities);
}
