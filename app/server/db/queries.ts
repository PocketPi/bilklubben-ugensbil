import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import { cars as carsSchema } from "./schema";
import { desc, eq } from "drizzle-orm";
const db = drizzle(process.env.DATABASE_URL!);

export const QUERIES = {
    getCars: function () {
        return db
            .select()
            .from(carsSchema)
            .where(eq(carsSchema.archived, false))
            .orderBy(desc(carsSchema.points));
    },
};

export const MUTATIONS = {
    createCar: async function (input: {
        manufacturer: string;
        model: string;
        points: number;
        imageUrl: string;
        episode: number;
        archived?: boolean;
    }) {
        return await db.insert(carsSchema).values({
            manufacturer: input.manufacturer,
            model: input.model,
            points: input.points,
            imageUrl: input.imageUrl,
            episode: input.episode,
            archived: input.archived ?? false,
        });
    },
    updateCar: async function (id: number, input: {
        manufacturer: string;
        model: string;
        points: number;
        imageUrl: string | null;
        episode: number;
    }) {
        return await db
            .update(carsSchema)
            .set({
                manufacturer: input.manufacturer,
                model: input.model,
                points: input.points,
                imageUrl: input.imageUrl,
                episode: input.episode,
            })
            .where(eq(carsSchema.id, id));
    },
};