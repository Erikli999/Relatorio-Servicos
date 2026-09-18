import express from "express";
import cors from "cors";
import prisma from "./lib/prisma.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/teste-banco", async (req, res) =>{
    const relatorios = await prisma.relatorio.findMany({
        include:{
            servicos:true
        }
    });

    res.json(relatorios);
});

app.post("/relatorios", async(req, res) => {

    const {servicos} = req.body;

    const relatorio = await prisma.relatorio.create({
        data: {
            servicos: {
                create: servicos.map((descricao) => ({
                    descricao
                }))
            }
        },
        include: {
            servicos: true
        }
    });
    res.json(relatorio);
});
const PORT = 3333;

app.listen(PORT, () =>{
    console.log(`Servidor rodando em htttp://localhost:${PORT}`);
});