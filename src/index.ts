import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { Database } from './db/db';
import authRouter from "./routes/auth.route"

const app = express();
const PORT = process.env.PORT ?? 3001;

// Initialize middleware
app.use(express.json());
// app.use(cookieParser());

// Configure CORS
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://yourdomain.com",
      ];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);

// Global error handler
app.use(
  (err: Error, req: Request, res: Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something broke!" });
  }
);

// Initialize database and start server
const startServer = async () => {
  try {
    // Connect to database
    const db = Database.getInstance();
    await db.connect();
    
    // Start Express server after DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the application
startServer();

export default app;