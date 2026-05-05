import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import { createSyncRun, finishSyncRun, runFullSync } from "../../../../lib/sync/woo-sync";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization") ?? "";
  const token = process.env.ADMIN_SYNC_TOKEN;

  if (!token || auth !== `Bearer ${token}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const runId = await createSyncRun();

  try {
    const result = await runFullSync();

    await finishSyncRun(runId, "success", result);

    revalidateTag("catalog", {});
    revalidatePath("/sitemap.xml");

    return NextResponse.json({
      status: "success",
      categoriesCount: result.categoriesCount,
      productsCount: result.productsCount,
      runId,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await finishSyncRun(runId, "error", undefined, message);
    return NextResponse.json({ error: message, runId }, { status: 500 });
  }
}
