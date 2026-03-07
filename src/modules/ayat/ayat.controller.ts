/*
 * Etha3a – Quran & Azkar API
 * Copyright (c) 2026 RlxChap2 and kremdev
 * MIT License
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import { fetchAllAyat } from './ayat.service.js';

export async function getAllAyat(req: FastifyRequest, reply: FastifyReply) {
    try {
        const data = await fetchAllAyat();
        return reply.send({ success: true, data });
    } catch (err) {
        return reply.status(503).send({
            success: false,
            message: (err as Error).message || 'No APIs available',
        });
    }
}

export async function getAyatBySurahId(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
        const data = await fetchAllAyat();

//find 

        return reply.send({ success: true, data });
    } catch (err) {
        return reply.status(503).send({
            success: false,
            message: (err as Error).message || 'No APIs available',
        });
    }
}
