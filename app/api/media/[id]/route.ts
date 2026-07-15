import { prisma } from "@/lib/db";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const asset = await prisma.mediaAsset.findUnique({ where: { id } });

  if (!asset) {
    return new Response("Not found", { status: 404 });
  }

  const encodedName = encodeURIComponent(asset.filename);

  return new Response(new Uint8Array(asset.data), {
    headers: {
      "Content-Type": asset.mimeType,
      "Content-Length": String(asset.size),
      "Content-Disposition": `inline; filename="${encodedName}"; filename*=UTF-8''${encodedName}`,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
