import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import { cars as carsSchema } from "./schema";
const db = drizzle(process.env.DATABASE_URL!);

export const QUERIES = {
    getCars: function () {
        return db
            .select()
            .from(carsSchema)
            .orderBy(carsSchema.id);
    },
};

export const MUTATIONS = {
    createCar: async function (input: {
        manufacturer: string;
        model: string;
        points: number;
        imageUrl: string;
        episode: number;
    }) {
        return await db.insert(carsSchema).values({
            manufacturer: input.manufacturer,
            model: input.model,
            points: input.points,
            imageUrl: input.imageUrl,
            episode: input.episode,
        });
    },
};