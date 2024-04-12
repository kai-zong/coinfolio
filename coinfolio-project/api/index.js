import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";

// this is a middleware that will validate the access token sent by the client
const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: "RS256",
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

app.get("/transactions", requireAuth, async (req, res) => {
    const auto0Id = req.auth.payload.sub;

    const user = await prisma.user.findUnique({
        where: {
            auth0Id: auto0Id,
        },
    });

    const transactions = await prisma.transaction.findMany({ where: { userId: user.id } });

});

app.get("/me", requireAuth, async (req, res) => {
    const auto0Id = req.auth.payload.sub;

    const user = await prisma.user.findUnique({
        where: {
            auth0Id: auto0Id,
        },
    });

    res.json(user);
});

app.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
});