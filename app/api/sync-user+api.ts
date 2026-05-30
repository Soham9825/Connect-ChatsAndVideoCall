import { StreamChat } from "stream-chat";

const APi_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY!;
const SECRET_KEY = process.env.STREAM_SECRET_KEY!;

export async function POST(request: Request) {
  const client = StreamChat.getInstance(APi_KEY, SECRET_KEY);

  const body = await request.json();

  const { userId, name, image } = body;

  if (!userId || !name) {
    return Response.json({ error: "Missing userId or name" }, { status: 400 });
  }

  try {
    await client.upsertUser({
      id: userId,
      name: name || "Guest",
      ...(image ? { image } : {}),
    });
    return Response.json(
      { message: "User synced successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error syncing user:", error);
    return Response.json({ error: "Failed to sync user" }, { status: 500 });
  }
}
