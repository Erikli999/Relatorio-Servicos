import { useState } from "react"

function App() {
  const[cliente, setCliente] = useState("");
  const[servicos, setServicos] = useState([]);
  const[novoServico, setNovoServico] = useState("");
  const[pendencias, setPendencias] = useState("");
  const[novaPendencia, setNovaPendencia] = useState("");
  const[precisaPeca, setPrecisaPeca] = useState(null);
  const[peca, setPeca] = useState("");
  const[pecaDisponivel, setPecaDisponivel] = useState(null);
  const [pecaSolicitada, setPecaSolicitada] = useState(null);
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
        <div className="flex justify-center gap-6">
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
                className="rounded-lg bg-gray-100 px-4 py-3 text-sm text-gray-700"
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

              <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-orange-700">
                + Adicionar Pendências
              </button>
            </div>
          </section>
        </div>

        <div className="flex justify-end">
          <button className="rounded bg-green-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
            Salvar Relatório
          </button>
        </div>

      </div>
    </div>
  )
}

export default App
