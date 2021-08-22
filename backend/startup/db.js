import mongoose from 'mongoose';

const db = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
        .then(() => console.log('Connected to MongoDB...'.blue.bold));
}

export { db };