"use client";

export default async function declineMatchClient(idMatch: number) {
  try {
    const response = await fetch("/api/matches/decline/" + idMatch, {
      method: "POST",
    });
    // Проверка на успешный ответ
    if (!response.ok) {
      // Обработка ошибок на уровне HTTP
      throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
  } catch (error: any) {
    // Обработка ошибок сети или других ошибок
    console.error("Произошла ошибка:", error.message);
  }
}
