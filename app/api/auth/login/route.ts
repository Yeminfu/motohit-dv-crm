import { NextResponse } from "next/server";
import sendMessageToTg from "@/utils/sendMessageToTg/sendMessageToTg";
import getUserByTg from "@/utils/users/getUserByTg";
import getRandomNumber from "@/utils/getRandomNumber";
import saveToken from "./saveToken";
import generateToken from "./generateToken";
import addHistoryEntry from "@/utils/history/addHistoryEntry";

export async function POST(request: Request) {
  const resquestData = await request.json();
  if (!resquestData.login) {
    await addHistoryEntry("login", {
      login: resquestData.login,
      success: false,
    });
    return NextResponse.json({ success: false });
  }

  const user = await getUserByTg(resquestData.login);

  if (!user) {
    await addHistoryEntry("login", {
      login: resquestData.login,
      success: false,
    });
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

    await addHistoryEntry("login", {
      login: resquestData.login,
      success: true,
    });

    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}
