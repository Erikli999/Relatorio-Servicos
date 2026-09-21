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

    const {cliente, servicos, pendencias} = req.body;

    const relatorio = await prisma.relatorio.create({
        data: {
            cliente,
            
            servicos: {
                create: servicos.map((descricao) => ({
                    descricao
                }))
            },
        
            pendencias: {
                create: pendencias.map((pendencia) => ({
                    descricao: pendencia.descricao,
                    precisaPeca: pendencia.precisaPeca,
                    peca: pendencia.peca,
                    pecaDisponivel: pendencia.pecaDisponivel
                }))
            }
        },
        include: {
            servicos: true,
            pendencias: true
        }
    });
    res.json(relatorio);
});

app.get("/relatorios", async (req, res) =>{
    const relatorios = await prisma.relatorio.findMany({
        include:{
            servicos:true,
            pendencias: true
        }
    });

    res.json(relatorios);
});

app.get("/relatorios/:id", async (req, res) =>{
    const {id} = req.params;
    const relatorios = await prisma.relatorio.findUnique({
        where: {
            id: Number(id)
        },
        include:{
            servicos:true,
            pendencias: true
        }
    });

    res.json(relatorios);
});

const PORT = 3333;

app.listen(PORT, () =>{
    console.log(`Servidor rodando em htttp://localhost:${PORT}`);
});