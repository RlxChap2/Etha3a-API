/*
 * Etha3a – Quran & Azkar API
 * Copyright (c) 2026 RlxChap2 and kremdev
 * MIT License
 */

import { FastifyReply, FastifyRequest } from 'fastify';
import { getAyatContent } from './ayat.service.js';

export async function getAllAyat(req: FastifyRequest, reply: FastifyReply) {
    try {
        const data = await getAyatContent();
        return reply.send({ success: true, data });
    } catch (err) {
        return reply.status(503).send({
            success: false,
            message: (err as Error).message || 'No APIs available',
        });
    }
}

export async function getAyatById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const id = parseInt(req.params.id);

    const data = await getAyatContent();

    const aya = data.ayat.find((a) => a.id === id);

    if (!aya) {
        return reply.status(404).send({
            success: false,
            message: 'Aya not found',
        });
    }

    return reply.send({
        success: true,
        data: aya,
    });
}
