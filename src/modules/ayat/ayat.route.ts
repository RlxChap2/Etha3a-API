/*
 * Etha3a – Quran & Azkar API
 * Copyright (c) 2026 RlxChap2 and kremdev
 * MIT License
 */

import { FastifyInstance } from 'fastify';
import { getAllAyat, getAyatById } from './ayat.controller.js';

export default async function ayatRoutes(fastify: FastifyInstance) {
    fastify.get('/ayat', getAllAyat);

    fastify.get('/ayat/:id', getAyatById);
}
