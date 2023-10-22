import { Heart, HeartHandshake, Home, LayoutGrid } from "lucide-react"

export type AppNavigation = typeof appNavigation

export const appNavigation = [
  {
    label: "",
    enabled: true,
    items: [
      {
        label: "Dashboard",
        enabled: true,
        url: "/inicio",
        icon: <Home height={16} width={16} />,
        items: [],
      },
      {
        label: "ONGs",
        enabled: true,
        url: "/ongs",
        icon: <HeartHandshake height={16} width={16} />,
        items: [],
      },
      {
        label: "Ativos",
        enabled: true,
        url: "/ativos",
        icon: <LayoutGrid height={16} width={16} />,
      },
      {
        label: "Doações",
        enabled: true,
        url: "/doacoes",
        icon: <Heart className="fill-primary text-primary" height={16} width={16} />,
        items: [],
      },
    ],
  },
  // {
  //   label: "Meus ativos",
  //   enabled: true,
  //   items: [
  //     {
  //       label: "Segurança e Habitação Segura",
  //       enabled: true,
  //       url: "/ativos/1",
  //       icon: <Home height={16} width={16} />,
  //     },
  //     {
  //       label: "Urbanização Inclusiva e Sustentável",
  //       enabled: true,
  //       url: "/ativos/3",
  //       icon: <Building height={16} width={16} />,
  //     },
  //     {
  //       label: "Transporte Seguro e Sustentável",
  //       enabled: true,
  //       url: "/ativos/2",
  //       icon: <Car height={16} width={16} />,
  //     },
  //   ],
  // },
  // {
  //   label: "Configuração",
  //   enabled: true,
  //   items: [
  //     {
  //       label: "Integrações",
  //       enabled: true,
  //       url: "/integracoes",
  //       icon: <Workflow height={16} width={16} />,
  //       items: [
  //         {
  //           label: "Webhooks",
  //           enabled: true,
  //           url: "/integracoes/webhooks",
  //           icon: <Webhook height={16} width={16} />,
  //         },
  //         {
  //           label: "Importar",
  //           enabled: true,
  //           url: "/integracoes/importar",
  //           icon: <UploadCloud height={16} width={16} />,
  //         },
  //       ],
  //     },
  //     {
  //       label: "Produtos",
  //       enabled: true,
  //       url: "/produtos",
  //       icon: <Package height={16} width={16} />,
  //     },
  //   ],
  // },
  // {
  //   label: "",
  //   enabled: true,
  //   items: [
  //     {
  //       label: "Clientes",
  //       enabled: true,
  //       url: "/clientes",
  //       icon: <Contact2 height={16} width={16} />,
  //     },
  //   ],
  // },
]
