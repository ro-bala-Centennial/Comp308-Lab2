require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const { connectDB } = require("./config/mongoose");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

async function start() {
    await connectDB(process.env.MONGO_URI);

    const app = express();

    app.use(
        cors({
            origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
            credentials: true,
        })
    );

    app.use(express.json());

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    app.use(
        "/graphql",
        expressMiddleware(server, {
            context: async ({ req }) => {
                const auth = req.headers.authorization || "";
                const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
                if (!token) return { user: null };

                try {
                    const payload = jwt.verify(token, process.env.JWT_SECRET);
                    return { user: payload };
                } catch (err) {
                    console.log("JWT VERIFY FAILED:", err.message);
                    return { user: null };
                }
            },
        })
    );

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
        console.log(`✅ GraphQL ready at http://localhost:${PORT}/graphql`)
    );
}

start();