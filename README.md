# Plataforma FENAREM

Mapa interativo oficial da FENAREM para localização de expositores, stands e áreas de serviço durante o evento.

A aplicação foi projetada para funcionar em computadores, notebooks, tablets, celulares, totens, telas touch, TVs Full HD, monitores ultrawide e painéis 2K/4K. A planta mantém o sistema de coordenadas original e escala proporcionalmente sem alterar posição, rotação, inclinação ou dimensão dos stands.

## Recursos

### Mapa interativo

- Planta oficial da FENAREM em alta resolução.
- 76 stands com polígonos individuais e geometria fiel à planta.
- Clique, toque e navegação por teclado em stands e áreas interativas.
- Destaque discreto no hover, foco e seleção.
- Stand selecionado permanece identificado enquanto suas informações estão abertas.
- Pan por mouse ou toque.
- Zoom in e zoom out.
- Modo de tela cheia.
- Centralização automática após inatividade somente quando o mapa estiver deslocado ou ampliado.
- Controles protegidos contra conflitos com o gesto de arrastar.
- Atualização do movimento sincronizada com `requestAnimationFrame`.

### Busca de expositores

- Pesquisa por nome da marca, categoria ou número do stand.
- Sugestões aleatórias de stands ao abrir a busca vazia.
- Nova seleção de sugestões a cada abertura.
- Logos reais recortadas diretamente da planta oficial.
- Correção automática da rotação de cada logo.
- Enquadramento quadrado calculado pelas dimensões reais do stand.
- Seleção do resultado com centralização e abertura das informações.
- Estado vazio com orientação para uma nova pesquisa.

### Informações e catálogos

- Painel de informações do expositor.
- Nome da empresa e código real do stand.
- Categoria do expositor.
- Indicação de catálogo indisponível quando não houver endereço cadastrado.
- Catálogos carregados dentro da própria aplicação por `iframe`.
- Modal com fundo atenuado e botão de fechamento.
- Fechamento por botão, clique no fundo ou tecla `Escape`.

### Áreas e serviços

O mapa também possui áreas interativas independentes dos stands, incluindo:

- Lounge.
- Retirada de vouchers.
- Consulta de cupons.
- Banheiros.
- Restaurante.
- Credenciamento.
- Rodada de Negócios Superior.
- Rodada de Negócios Inferior.
- Acesso principal e demais pontos configurados na planta.

As áreas removidas da interação continuam visíveis na imagem oficial, mas não recebem hover, clique ou marcação.

### Acesso rápido

- Atalhos para os principais serviços do evento.
- Estado visual selecionado.
- Centralização e abertura das informações da área.
- Identificação do ponto de entrada do visitante.

### Responsividade

- Layout adaptável para landscape e portrait.
- Painel lateral em desktop.
- Painel inferior em dispositivos móveis e telas verticais.
- Escala fluida com `clamp()`, unidades relativas e container queries.
- Áreas seguras com `env(safe-area-inset-*)`.
- Controles maiores em dispositivos com ponteiro touch.
- Mapa proporcional com SVG `viewBox` e `preserveAspectRatio`.
- Suporte visual para 1366×768, Full HD, 2K, ultrawide e 4K.
- Página principal sem rolagem desnecessária; rolagem fica restrita a componentes que precisam dela.

### Acessibilidade

- Navegação por teclado nos stands.
- Ativação por `Enter` e barra de espaço.
- Foco visível.
- Nomes acessíveis nos controles.
- Busca declarada como combobox.
- Feedback por cor, contorno e estado persistente.
- Áreas mínimas adequadas para toque.
- Respeito a `prefers-reduced-motion`.
- Mensagens de estado com regiões ARIA.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| [Next.js 15](https://nextjs.org/) | Framework, roteamento e build de produção |
| [React 19](https://react.dev/) | Componentes e gerenciamento de estado |
| [TypeScript 5](https://www.typescriptlang.org/) | Tipagem estática do projeto |
| SVG | Planta escalável, polígonos e interações dos stands |
| CSS | Design system, responsividade, animações e estados visuais |
| [Lucide React](https://lucide.dev/) | Ícones da interface |
| ESLint | Verificação de qualidade do código |
| pnpm | Gerenciamento de dependências e lockfile |

O projeto não utiliza banco de dados ou serviço backend. As informações do mapa são carregadas de arquivos TypeScript locais.

## Arquitetura

```text
plataforma_fenarem/
├── public/
│   ├── brands/                    # Logos vetoriais disponíveis
│   └── reference/                 # Planta oficial em alta resolução
├── src/
│   ├── app/
│   │   ├── globals.css            # Tokens e estilos globais/responsivos
│   │   ├── layout.tsx             # Layout raiz e metadados
│   │   ├── mapa/page.tsx          # Página do mapa
│   │   └── page.tsx               # Entrada da aplicação
│   ├── components/
│   │   ├── interactive-map/       # Interface, busca e painel principal
│   │   └── map/                   # SVG, polígonos e interações do mapa
│   ├── data/
│   │   ├── fairMap/               # Stands, áreas especiais e tipos
│   │   ├── kiosks.ts              # Pontos de origem do visitante
│   │   └── locations.ts           # Áreas e atalhos de localização
│   ├── lib/                       # Busca e eventos analíticos
│   ├── services/                  # Composição dos dados da interface
│   └── types/                     # Contratos TypeScript
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

## Sistema de coordenadas do mapa

A planta utiliza uma base nativa de `8000 × 4500` pixels. Os stands e áreas são armazenados como polígonos com pontos absolutos nessa base.

O componente SVG utiliza um `viewBox` estável e aplica escala proporcional durante a renderização. Por isso, os dados não precisam ser recalculados para cada resolução.

Exemplo simplificado:

```ts
{
  id: "O05",
  code: "O05",
  name: "3M",
  type: "stand",
  precision: "verified",
  points: [
    { x: 2454, y: 2010 },
    { x: 2652, y: 1871 },
    { x: 2791, y: 2069 },
    { x: 2593, y: 2208 }
  ]
}
```

> Não altere coordenadas, ordem dos vértices ou dimensões sem conferir visualmente a planta oficial.

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou superior.
- [pnpm](https://pnpm.io/) 9 ou superior.

Também é possível usar npm, mas o lockfile oficial do projeto é o `pnpm-lock.yaml`.

## Instalação

Clone o repositório:

```bash
git clone https://github.com/phaaael/plataforma_fenarem.git
cd plataforma_fenarem
```

Como o repositório é privado, a conta utilizada no clone precisa possuir acesso.

Instale as dependências:

```bash
pnpm install
```

## Desenvolvimento

Inicie o servidor local:

```bash
pnpm dev
```

Acesse:

```text
http://localhost:3000/mapa
```

A rota `/` também direciona para a experiência principal.

## Build de produção

Gere a versão otimizada:

```bash
pnpm build
```

Inicie o servidor de produção:

```bash
pnpm start
```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Cria o build otimizado de produção |
| `pnpm start` | Executa o build de produção |
| `pnpm typecheck` | Valida os tipos sem gerar arquivos |
| `pnpm lint` | Executa a configuração de lint do projeto |

## Parâmetros da URL

### Kiosk/origem

O ponto de origem pode ser selecionado pelo parâmetro `kiosk`:

```text
/mapa?kiosk=entrada
```

Os valores disponíveis são definidos em `src/data/kiosks.ts`.

### Editor de depuração do mapa

O modo de depuração pode ser habilitado com:

```text
/mapa?mapDebug=true
```

Esse modo é destinado ao desenvolvimento e permite inspecionar áreas da planta. Não deve ser utilizado na URL pública do evento.

## Cadastro de stands

Os stands ficam em:

```text
src/data/fairMap/stands.ts
```

Cada item pode conter:

- `id`: identificador interno estável.
- `code`: número oficial exibido ao visitante.
- `name`: nome do expositor.
- `catalogUrl`: endereço do catálogo, quando disponível.
- `type`: tipo da área.
- `precision`: estado de conferência da geometria.
- `points`: vértices do polígono na planta original.

## Cadastro de áreas especiais

As áreas independentes dos stands ficam em:

```text
src/data/fairMap/specialAreas.ts
```

Os rótulos e hotspots usados no Acesso rápido ficam em:

```text
src/data/locations.ts
```

Ao remover uma área interativa, verifique também se existe uma versão legada em `FenaremMap.tsx`, evitando que um hotspot antigo volte a aparecer.

## Catálogos

O catálogo é aberto dentro da aplicação. Alguns sites podem bloquear carregamento em `iframe` por políticas próprias, como `X-Frame-Options` ou `Content-Security-Policy`.

Quando um expositor não possui `catalogUrl`, a interface exibe `CATÁLOGO INDISPONÍVEL`.

## Qualidade e validação

Antes de publicar alterações, execute:

```bash
pnpm typecheck
pnpm build
```

Para alterações visuais, valide pelo menos:

- Desktop 1366×768.
- Full HD 1920×1080.
- Ultrawide 2560×1080 ou superior.
- 4K 3840×2160.
- Tablet e celular.
- Tela vertical 1080×1920.
- Mouse, teclado e toque.

## Boas práticas para alterações no mapa

1. Preserve o arquivo original da planta.
2. Não transforme stands inclinados em retângulos comuns.
3. Não altere a geometria para melhorar apenas a aparência.
4. Confirme que a marcação não invade stands vizinhos.
5. Teste clique, toque, foco e fechamento do painel.
6. Confira nome, código e catálogo do expositor.
7. Execute typecheck e build antes do commit.

## Solução de problemas

### A porta 3000 já está ocupada

O Next.js selecionará outra porta automaticamente. Verifique o endereço informado no terminal.

### A imagem do mapa não aparece

Confirme a existência de:

```text
public/reference/fenarem-reference.png
```

### Um catálogo não abre dentro do modal

O site externo pode impedir incorporação por iframe. Confirme os cabeçalhos de segurança do endereço cadastrado.

### Um stand não responde ao clique

Verifique:

- Se o item existe em `stands.ts`.
- Se o polígono possui pontos válidos.
- Se o ID corresponde ao expositor produzido por `map-data.ts`.
- Se outra camada SVG está sobre o polígono.

### A marcação está deslocada

Não converta as coordenadas manualmente para porcentagens. Os pontos devem permanecer na base original `8000 × 4500` e ser renderizados pelo mesmo SVG da planta.

## Segurança

- Nunca envie arquivos `.env` ao repositório.
- Não inclua tokens, senhas ou credenciais nos arquivos de dados.
- Links de catálogo são públicos e devem usar HTTPS sempre que possível.
- Dependências, builds e ferramentas locais são ignorados pelo Git.

## Licença e uso

Projeto privado destinado à operação da FENAREM. Imagens, marcas, catálogos e materiais institucionais pertencem aos seus respectivos titulares e devem ser utilizados somente com a autorização adequada.
