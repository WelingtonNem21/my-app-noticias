<div align="center">

# 📰 Daily News

**Seu app de notícias pessoal — leia, curta, salve e publique.**

![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-54.0-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Local%20DB-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

</div>

---

## Sobre o projeto

**Daily News** é um aplicativo mobile de notícias construído com **React Native + Expo**. Os usuários podem criar conta, fazer login, publicar posts com imagens, curtir conteúdos e salvá-los para ler depois — tudo armazenado localmente com **SQLite**, sem depender de internet.

---

## Telas

| Tela | Descrição |
|------|-----------|
| **Login** | Autenticação com email e senha |
| **Cadastro** | Criação de conta com nome, email e senha |
| **Home** | Feed de posts com destaques e categorias |
| **Post** | Leitura completa, curtir e salvar |
| **Salvos** | Lista de posts favoritados |
| **Perfil** | Dados do usuário, contagem de salvos e curtidas |

---

## Funcionalidades

- Cadastro e login de usuários
- Feed de publicações com prévia de imagem
- Criação de posts com título, conteúdo e foto (câmera ou galeria)
- Curtir posts diretamente na tela de leitura
- Salvar / remover posts dos favoritos
- Tela de perfil com estatísticas reais (salvos e curtidas recebidas)
- Navegação por abas com menu inferior fixo
- Banco de dados local — funciona 100% offline

---

## Tecnologias

| Lib | Uso |
|-----|-----|
| `expo-router` | Roteamento por sistema de arquivos |
| `expo-sqlite` | Banco de dados local (SQLite) |
| `expo-image-picker` | Seleção de fotos da galeria e câmera |
| `@expo/vector-icons` | Ícones (Ionicons) |
| `react-native-reanimated` | Animações |
| `react-native-safe-area-context` | Áreas seguras iOS/Android |

---

## Banco de dados

O banco **`noticias.db`** é criado automaticamente no primeiro acesso com duas tabelas:

```sql
-- Usuários
CREATE TABLE usuario (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  nome     TEXT NOT NULL,
  email    TEXT NOT NULL UNIQUE,
  senha    TEXT NOT NULL
);

-- Posts
CREATE TABLE post (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo     TEXT NOT NULL,
  conteudo   TEXT NOT NULL,
  imagem     TEXT,
  curtidas   INTEGER DEFAULT 0,
  favorito   INTEGER DEFAULT 0,
  usuario_id INTEGER REFERENCES usuario(id)
);
```

---

## Estrutura do projeto

```
my-app-noticias/
├── app/
│   ├── index.tsx          # Login
│   ├── cadastro.tsx       # Cadastro
│   ├── home.tsx           # Feed principal
│   ├── salvo.tsx          # Posts salvos
│   ├── perfil.tsx         # Perfil do usuário
│   └── post/
│       └── [id].tsx       # Detalhe do post
└── src/
    ├── components/
    │   └── BottomMenu.tsx # Menu de navegação inferior
    ├── repositories/
    │   ├── PostRepository.ts      # CRUD de posts
    │   └── UsuarioRepositores.ts  # CRUD de usuários
    ├── types/
    │   ├── post.ts
    │   └── usuario.ts
    └── database.ts        # Inicialização do SQLite
```

---

## Como rodar

**Pré-requisitos:** Node.js 18+, Expo CLI e um dispositivo/emulador Android ou iOS.

```bash
# Clone o repositório
git clone https://github.com/WelingtonNem21/my-app-noticias.git
cd my-app-noticias

# Instale as dependências
npm install

# Inicie o projeto
npm start
```

Depois escaneie o QR Code com o **Expo Go** (Android/iOS) ou pressione `a` para abrir no emulador Android.

---

## Scripts disponíveis

```bash
npm start        # Inicia o servidor de desenvolvimento
npm run android  # Abre diretamente no Android
npm run ios      # Abre diretamente no iOS
npm run web      # Abre no navegador
```

---

<div align="center">

Feito com React Native & Expo

</div>
