
function App() {
  return(
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-auto max-w-5x1">

        <header className="mb-10">
          <h1 className="text-3x1 font-bold text-blue-800">
            Relatório de Serviços
          </h1>
          <p>
            Registre os serviços realizados e as pendências do dia.
          </p>
        </header>
        <div className="flex justify-center gap-6">
          <section className="mb-8 rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibloud text-gray-800">
             Serviços Realizados
            </h2>

            <p className="mb-6 text-sm text-gray-500">
              Registre os Serviços concluídos durante o dia.
            </p>

            <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-green-700">
              + Adicionar Serviços
            </button>
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
