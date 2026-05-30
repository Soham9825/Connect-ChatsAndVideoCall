import { StreamChat } from "stream-chat";

const API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY!;
const SECRET_KEY = process.env.STREAM_SECRET_KEY!;

export async function POST(request: Request) {
  const client = StreamChat.getInstance(API_KEY, SECRET_KEY);

  const body = await request.json();

  const { userId } = body;

  if (!userId) {
    return Response.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const token = client.createToken(userId);
    return Response.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Error creating token:", error);
    return Response.json({ error: "Failed to create token" }, { status: 500 });
  }
}
