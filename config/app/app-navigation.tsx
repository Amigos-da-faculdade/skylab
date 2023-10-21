import { HeartPulse, Home, Map } from "lucide-react"

export type AppNavigation = typeof appNavigation

export const appNavigation = [
  {
    label: "",
    enabled: true,
    items: [
      {
        label: "Início",
        enabled: true,
        url: "/inicio",
        icon: <Home height={16} width={16} />,
        items: [],
      },
    ],
  },
  {
    label: "Menu",
    enabled: true,
    items: [
      {
        label: "Sustentabilidade",
        enabled: true,
        url: "/sustentabilidade",
        icon: <HeartPulse height={16} width={16} />,
        items: [
          {
            label: "Guias",
            enabled: true,
            url: "/sustentabilidade/guias",
            icon: <Map height={16} width={16} />,
          },
        ],
      },
    ],
  },
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
