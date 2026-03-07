/*
 * Etha3a – Quran & Azkar API
 * Copyright (c) 2026 RlxChap2 and kremdev
 * MIT License
 */

export interface AyaItem {
    number: number;
    text: string;
}

export interface SurahWithAyat {
    id: number;
    name: string;
    ayat: AyaItem[];
}

export async function fetchAllAyat(): Promise<SurahWithAyat[]> {
    const surahRes = await fetch('https://api.alquran.cloud/v1/surah');
    if (!surahRes.ok) throw new Error('Failed to fetch surahs');
    const surahData = (await surahRes.json()).data as { number: number; name: string }[];

    const result: SurahWithAyat[] = [];

    for (const s of surahData) {
        const ayahRes = await fetch(`https://api.alquran.cloud/v1/surah/${s.number}`);
        if (!ayahRes.ok) throw new Error(`Failed to fetch ayat for surah ${s.number}`);
        const ayahJson = await ayahRes.json();
        const ayahs = ayahJson.data.ayahs as { numberInSurah: number; text: string }[];

        result.push({
            id: s.number,
            name: s.name,
            ayat: ayahs.map((a) => ({ number: a.numberInSurah, text: a.text })),
        });
    }

    return result;
}