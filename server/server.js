    import express from 'express';
    import dotenv from 'dotenv';
    import mongoose from 'mongoose';
    import cors from 'cors';
    import trainRoutes from './routes/trainRoutes.js';
    import connectDB from './config/db.js';

    dotenv.config();
    connectDB();

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use('/api/trains', trainRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
