import { useState } from "react";
import {jsPDF} from "jspdf";

function App() {
  const[cliente, setCliente] = useState("");
  const[servicos, setServicos] = useState([]);
  const[novoServico, setNovoServico] = useState("");
  const[pendencias, setPendencias] = useState([]);
  const[novaPendencia, setNovaPendencia] = useState("");
  const[precisaPeca, setPrecisaPeca] = useState(null);
  const[peca, setPeca] = useState("");
  const[pecaDisponivel, setPecaDisponivel] = useState(null);
  const [pecaSolicitada, setPecaSolicitada] = useState(null);
  const [tela, setTela] = useState("novo");
  const [relatorios, setRelatorios] = useState([]);
  const [relatorioSelecionado, setRelatorioSelecionado] =useState(null);
  const [mensagem, setMensagem] = useState("")

  const relatoriosPorData = relatorios.reduce((grupos, relatorio) => {
    const data = new Date(relatorio.data).toLocaleDateString("pt-BR");

    if (!grupos[data]) {
      grupos[data] = [];
    }

    grupos[data].push(relatorio);

    return grupos;
  }, {});

  const excluirRelatorio = async (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esse relatório?"
    );

    if (!confirmar){
      return;
    };

    await fetch(`http://localhost:3333/relatorios/${id}`, {
      method: "DELETE"
    });

    buscarRelatorios();
  };

  const baixarPDF = () => {
    if (!relatorioSelecionado) return;

    const doc = new jsPDF();
    
    let y = 20;

    doc.setFontSize(18);
    doc.text("Relatório de Serviços", 20, y);

    y += 15;

    doc.setFontSize(12);
    doc.text(`Cliente: ${relatorioSelecionado.cliente}`, 20, y);

    y += 8;

    doc.text (
      `Data: ${new Date(relatorioSelecionado.data).toLocaleDateString("pt-BR")}`,20,y
    );

    y += 15;

    doc.setFontSize(12);

    (relatorioSelecionado.servico || []).forEach((servico) => {
      doc.text(`• ${servico.descricao}`, 25, y);
      y += 8;
    });

    y +=8;

    doc.setFontSize(14);
    doc.text("Pendências:", 20, y);

    y += 10;

    doc.setFontSize(12);

    (relatorioSelecionado.pendencias || []).forEach((pendencia) => {
      doc.text(`• ${pendencia.descricao}`, 25, y);
      y += 8;

      if(pendencia.pecaSolicitada) {
        doc.text(`Peça: ${pendencia.peca}`, 30, y);
        y += 8;
      }
      y += 3;
    });
    doc.save(`relatorio-${relatorioSelecionado.id}.pdf`)
  };

  const buscarRelatorios = async () => {
    const resposta = await fetch("http://localhost:3333/relatorios");
    const dados = await resposta.json();

    setRelatorios(dados);
  }

  const visualizarRelatorio = async (id) => {
    const resposta = await fetch(`http://localhost:3333/relatorios/${id}`);
    const dados = await resposta.json();

    setRelatorioSelecionado(dados);
  }

  const salvarRelatorio = async () => {
    const dados = {
      cliente,
      servicos,
      pendencias
    };
    const resposta = await fetch ("http://localhost:3333/relatorios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });
    const resultado = await resposta.json();

    setMensagem("Relatório salvo com sucesso!");

    setCliente("");
    setServicos([]);
    setPendencias([]);
    setNovoServico("");
    setNovaPendencia("");
    setPrecisaPeca(null);
    setPeca("");
    setPecaDisponivel("");
    setPecaSolicitada("");
  };
  const removerPendencia = (index) => {
    setPendencias(pendencias.filter((_, i) => i !== index));
  };
  const adicionarServico = () => {
    if (novoServico.trim() === "") {
      return;
    }
    setServicos([...servicos, novoServico]);
    setNovoServico("");
  }; 
  const removerServico = (index) => {
    setServicos(servicos.filter((_, i) => i !== index));
  };
  const adicionarPendencia = () => {
    if (novaPendencia.trim() === ""){
      return;
    }
    const nova = {
      descricao: novaPendencia,
      precisaPeca: precisaPeca,
      peca: precisaPeca ? peca: null,
      pecaDisponivel: precisaPeca ? pecaDisponivel: null,
      pecaSolicitada: precisaPeca ? pecaSolicitada: null
    };
    setPendencias([...pendencias, nova]);

    setNovaPendencia("");
    setPrecisaPeca(null);
    setPeca("");
    setPecaDisponivel("");
    setPecaSolicitada("");
  };
  return(
    <div className="min-h-screen bg-gray-300 p-6">
      <div className="max-auto max-w-5x1">

        <header className="mb-10">
          <h1 className="text-3x1 font-bold text-blue-800">
            Relatório de Serviços
          </h1>
          <p>
            Registre os serviços realizados e as pendências do dia.
          </p>
        </header>
        <div className="mb-8">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Cliente
          </label>
          <input 
            type="text"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            placeholder="Digite o nome do cliente"
            className="w-full rounded-lg broder broder-gray-300 bg-white px-4 py-3 shadow-md outline-none focus:border-blue-500"
          />
        </div>
        
        <div>
          <button
            onClick={() => {
              setTela("historico");
              buscarRelatorios();
            }}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Relatórios Anteriores
          </button>

          {relatorioSelecionado && (
            <div className="bg-white p-6 rounded-lg shadow mt-4">
              <h2 className="text-xl font-bold">
                {relatorioSelecionado.cliente}
              </h2>

              <p className="text-gray-600">
                {new Date(relatorioSelecionado.data).toLocaleDateString("pt-BR")}
              </p>

              <h3 className="font-bold mt-4">Serviços realizados</h3>

              {relatorioSelecionado.servicos.map((servico) => (
                <p key={servico.id}>
                  • {servico.descricao}
                </p>
              ))}

              <h3 className="font-bold mt-4">Pendências</h3>

              {relatorioSelecionado.pendencias.map((pendencia) => (
                <div key={pendencia.id} className="mt-2">
                  <p>• {pendencia.descricao}</p>

                  {pendencia.peca && (
                    <p className="text-sm text-gray-600">
                      Peça: {pendencia.peca}
                    </p>
                  )}
                </div>
              ))}

              <button
                onClick={baixarPDF}
                className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Baixar PDF
              </button>
            </div>
          )}

          <div className="mt-4 space-y-3">
            {relatorios.map((relatorio) => (
              <div
                key={relatorio.id}
                className="bg-white p-4 rounded-lg shadow"
              >
                <h3 className="font-bold">
                  {relatorio.cliente}
                </h3>

                <p className="text-sm text-gray-600">
                  {new Date(relatorio.data).toLocaleDateString("pt-BR")}
                </p>

                <p className="text-sm">
                  Serviços: {relatorio.servicos.length}
                </p>

                <p className="text-sm">
                  Pendências: {relatorio.pendencias.length}
                </p>

                <button 
                  onClick={() => visualizarRelatorio(relatorio.id)}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                  Visualizar
                </button>
                <button 
                  onClick={() => excluirRelatorio(relatorio.id)}
                  className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>

        </div>

        <div className="flex justify-center gap-6 mt-4">
          <section className="mb-8 rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibloud text-gray-800">
             Serviços Realizados
            </h2>

            <p className="mb-6 text-sm text-gray-500">
              Registre os Serviços concluídos durante o dia.
            </p>

            <div className="flex flex-col gap-3">
              <input type="text"
                value={novoServico}
                onChange={(e) => setNovoServico(e.target.value)}
                placeholder="Descreva o serviço realizado"
                className="mb-3 w-full-md rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md outline-none focus:border-blue-500"
              />
              <button 
                onClick={adicionarServico}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-green-700">
                + Adicionar Serviços
              </button>
              {servicos.map((servico, index) => (
                <div 
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-100 px-4 py-3 text-sm text-gray-700"
                >
                  <span>{servico}</span>

                  <button
                    onClick={() => removerServico(index)}
                    className="text-red-500 hover:text-red-700">
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Pendências
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              Registre os serviços que ficaram pendentes.
            </p>

            <div className="flex flex-col gap-3">

              <input 
                type="text" 
                value={novaPendencia}
                onChange={(e) => setNovaPendencia(e.target.value)}
                placeholder="Descreva a pendência"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 
                shadow-md outline-none focus:border-blue-500"
              />

              <label className="text-sm font-medium text-gray-700">
                Precisa Peça?
              </label>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input 
                    type="radio"
                    name="precisaPeca" 
                    checked={precisaPeca === true}
                    onChange={() => setPrecisaPeca(true)}
                  />
                  Sim
                </label>

                <label className="flex items-center gap-2">
                  <input 
                    type="radio"
                    name="precisaPeca" 
                    checked={precisaPeca === false}
                    onChange={() => setPrecisaPeca(false)}
                  />
                  Não
                </label>
              </div>
              
              {precisaPeca === true && (
                <>
                  <input
                    type="text"
                    value={peca}
                    onChange={(e) => setPeca(e.target.value)}
                    placeholder="Digite o nome da peça"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-md outline-none focus:border-blue-500"
                  />

                  <label className="text-sm font-medium text-gray-700">
                    Peça disponível?
                  </label>

                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                      type="radio"
                        name="pecaDisponivel"
                        checked={pecaDisponivel === true}
                        onChange={() => setPecaDisponivel(true)}
                      />
                      Sim
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="pecaDisponivel"
                        checked={pecaDisponivel === false}
                        onChange={() => setPecaDisponivel(false)}
                      />
                        Não
                    </label>
                  </div>

                  <label className="text-sm front-medium text-gray-700">
                    Peça já foi solicitada?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio"
                        name="pecaSolicitada"
                        checked={pecaSolicitada === true}
                        onChange={() => setPecaSolicitada(true)}
                      />
                      Sim
                    </label>

                    <label className="flex items-center gap-2">
                      <input 
                        type="radio"
                        name="pecaSolicitada"
                        checked={pecaSolicitada === false} 
                        onChange={() => setPecaSolicitada (false)}
                        />
                        Não
                    </label>
                  </div>
                </>
              )}

              <button
                onClick={adicionarPendencia}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-orange-700">
                + Adicionar Pendências
              </button>

              {pendencias.map((pendencia, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-gray-100 px-4 
                  py-3 text-sm text-gray-700"
                >
                  <div>
                    <p>{pendencia.descricao}</p>
                      {pendencia.precisaPeca && (
                      <p className="mt-1 text-xs">
                        Peça: {pendencia.peca}
                      </p>
                    )}
                  </div>
                  <button 
                    onClick={() => removerPendencia(index)}
                    className="text-red-500 hover:text-red-700">
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex justify-end">
          {mensagem && (
            <p className="mt-4 text-green-600 font-semibold">
              {mensagem}
            </p>
          )}
          <button 
            onClick={salvarRelatorio}
            className="rounded bg-green-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
            Salvar Relatório
          </button>
        </div>

      </div>
    </div>
  )
}

export default App
