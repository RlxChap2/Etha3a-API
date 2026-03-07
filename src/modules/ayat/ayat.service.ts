/*
 * Etha3a – Quran & Azkar API
 * Copyright (c) 2026 RlxChap2 and kremdev
 * MIT License
 */

import type { ApiFunction, AlQuranAyatResponse } from '@/src/types/Api.js';

export interface AyatItem {
    id: number;
    aya: string;
    surahName: string;
    numberInSurah: number;
    surah: number;
    apiName: 'alquran.cloud';
}

export const ayatApis: ApiFunction<AyatItem>[] = [
    async () => {
        const res = await fetch('https://api.alquran.cloud/v1/quran/quran-uthmani');
        if (!res.ok) throw new Error('API alquran.cloud failed');

        const json = (await res.json()) as AlQuranAyatResponse;

        const surahs = json.data.surahs;

        return surahs.flatMap((surah) =>
            surah.ayahs.map((a) => ({
                id: a.number,
                surahName: surah.name,
                aya: a.text,
                numberInSurah: a.numberInSurah,
                surah: surah.number,
                apiName: 'alquran.cloud',
            })),
        );
    },
];

export async function fetchWithFallback<T>(apis: ApiFunction<T>[]): Promise<T[]> {
    let lastError: Error | null = null;

    for (const api of apis) {
        try {
            const result = await api();
            if (result.length > 0) return result;
        } catch (err) {
            lastError = err instanceof Error ? err : new Error('Unknown error');
        }
    }

    if (lastError) throw lastError;
    return [];
}

export async function getAyatContent(): Promise<{ ayat: AyatItem[] }> {
    const ayat = await fetchWithFallback(ayatApis);
    return { ayat };
}
