import express from 'express';
import 'dotenv/config';
import './database/connectdb.js';
import auth from './routes/auth.route.js';

const app = express();
// si existe el port utiliza lo de antes de ||, si no utiliza lo de despues
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/v1',auth)
app.get("/", (req, res)=> {
    res.json({ok: true});
});

app.listen(PORT, () => console.log("🔥🔥🔥 http://localhost:" + PORT));