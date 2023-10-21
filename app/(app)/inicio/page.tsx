import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main>
      <div className="mx-auto flex max-w-5xl justify-between px-6 py-8">
        <h1 className="text-slate-12 text-[28px] font-bold leading-[34px] tracking-[-0.416px]">
          Churn
        </h1>
        <Button>Analisar</Button>
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <p>
          Tenha um visão geral de todas as vendas e clientes que você perdeu e defina a melhor
          estratégia para diminuir ainda mais essa taxa.
        </p>
      </div>
    </main>
  )
}
