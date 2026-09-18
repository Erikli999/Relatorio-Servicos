const express = require ("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>{

    res.json({
        message: "API do Relatório de Serviços Funcionando!"
    });
});
const PORT = 3333;

app.listen(PORT, () =>{
    console.log(`Servidor rodando em htttp://localhost:${PORT}`);
});