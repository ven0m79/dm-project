import fetchAllVariationPrices from "../../../utils/get-variations";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return new Response(JSON.stringify({ error: "No product ID provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const id = Number(idParam);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid product ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const variations = await fetchAllVariationPrices(id);

    return new Response(JSON.stringify({ variations }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API Error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch variations" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
