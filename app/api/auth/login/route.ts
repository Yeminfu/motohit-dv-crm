import { NextResponse } from "next/server";
import sendMessageToTg from "@/utils/sendMessageToTg/sendMessageToTg";
import getUserByTg from "@/utils/users/getUserByTg";
import getRandomNumber from "@/utils/getRandomNumber";
import saveToken from "./saveToken";
import generateToken from "./generateToken";
import addHistoryEntry from "@/utils/history/addHistoryEntry";

export async function POST(request: Request) {
  const resquestData = await request.json();
  await addHistoryEntry("login", {
    login: resquestData.login,
    success: true,
  });
  if (!resquestData.login) {
    return NextResponse.json({ success: 222222 });
  }

  const user = await getUserByTg(resquestData.login);

  if (!user) {
    return NextResponse.json({ success: false });
  }

  if (user) {
    const randomNumber = getRandomNumber(1000, 9999);
    const newToken = generateToken();
    await saveToken(user.id, newToken, randomNumber);
    await sendMessageToTg(
      user.tg_chat_id,
      `Код подтверждения: ${randomNumber}`
    );

    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, err: "#d8dneb" });
}
