import { useState } from "react"

function App() {
  const[cliente, steCliente] = useState("");
  const[servicos, setServicos] = useState([]);
  const[novoServico, setNovoServico] = useState("");
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
              <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-green-700">
                + Adicionar Serviços
              </button>
            </div>
          </section>

          <section className="mb-8 rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Pendências
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              Registre os serviços que ficaram pendentes.
            </p>

            <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-orange-700">
              + Adicionar Pendências
            </button>
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
