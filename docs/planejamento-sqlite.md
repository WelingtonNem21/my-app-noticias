# Planejamento: Banco de Dados SQLite + Captura de Inputs

## Visão Geral

Adicionar `expo-sqlite` ao projeto para persistir dados de usuários (cadastro/login), e ajustar `app/index.tsx` para capturar os valores digitados nos campos de email e senha.

---

## Parte 1 — Captura de inputs em `app/index.tsx`

### Problema atual
Os `TextInput` de email e senha não têm estado (`state`) vinculado a eles. Os valores digitados são perdidos e não podem ser enviados ao banco.

### Mudanças necessárias

**1. Importar `useState`**
```tsx
import { useState } from "react";
```

**2. Criar estados para os campos**
```tsx
const [email, setEmail] = useState("");
const [senha, setSenha] = useState("");
```

**3. Vincular estado aos `TextInput`**
```tsx
<TextInput
  style={style.input}
  placeholder="exemplo@email.com"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  autoCapitalize="none"
/>

<TextInput
  style={style.input}
  placeholder="senha"
  value={senha}
  onChangeText={setSenha}
  secureTextEntry
/>
```

**4. Passar os valores para a função de login**
```tsx
<TouchableOpacity
  onPress={() => handleLogin()}
  style={style.botton}
>
  <Text>Entrar</Text>
</TouchableOpacity>
```

**5. Criar a função `handleLogin`**
```tsx
async function handleLogin() {
  if (!email || !senha) {
    alert("Preencha todos os campos");
    return;
  }
  // chamar a função de verificação no banco (ver Parte 2)
}
```

---

## Parte 2 — Configurar SQLite com `expo-sqlite`

### Instalação

```bash
npx expo install expo-sqlite
```

### Estrutura de arquivos sugerida

```
app/
  index.tsx          ← tela de login (já existe)
  home.tsx           ← tela principal (já existe)
  esqueci.tsx        ← esqueci senha (já existe)
database/
  db.ts              ← configuração e instância do banco
  userRepository.ts  ← funções CRUD de usuário
```

### `database/db.ts` — Configuração do banco

```ts
import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("dailynews.db");

export function initDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      nome TEXT
    );
  `);
}
```

### `database/userRepository.ts` — Funções de usuário

```ts
import { db } from "./db";

export function buscarUsuarioPorEmail(email: string) {
  return db.getFirstSync(
    "SELECT * FROM usuarios WHERE email = ?",
    [email]
  );
}

export function criarUsuario(email: string, senha: string, nome?: string) {
  db.runSync(
    "INSERT INTO usuarios (email, senha, nome) VALUES (?, ?, ?)",
    [email, senha, nome ?? ""]
  );
}
```

### Inicializar banco no `app/_layout.tsx` (ou no root)

```tsx
import { useEffect } from "react";
import { initDatabase } from "../database/db";

export default function Layout() {
  useEffect(() => {
    initDatabase();
  }, []);

  // ... resto do layout
}
```

---

## Parte 3 — Integrar login em `app/index.tsx`

Após configurar o banco, a função `handleLogin` deve verificar o usuário:

```tsx
import { buscarUsuarioPorEmail } from "../database/userRepository";

async function handleLogin() {
  if (!email || !senha) {
    alert("Preencha todos os campos");
    return;
  }

  const usuario = buscarUsuarioPorEmail(email);

  if (!usuario) {
    alert("Usuário não encontrado");
    return;
  }

  if (usuario.senha !== senha) {
    alert("Senha incorreta");
    return;
  }

  router.push("/home");
}
```

> **Atenção:** Para produção, a senha deve ser armazenada com hash (ex: `expo-crypto` + SHA-256). Nunca salvar senha em texto puro.

---

## Checklist de implementação

- [ ] Instalar `expo-sqlite` com `npx expo install expo-sqlite`
- [ ] Criar pasta `database/`
- [ ] Criar `database/db.ts` com `openDatabaseSync` e `initDatabase`
- [ ] Criar `database/userRepository.ts` com `buscarUsuarioPorEmail` e `criarUsuario`
- [ ] Chamar `initDatabase()` no `_layout.tsx`
- [ ] Adicionar `useState` para `email` e `senha` em `app/index.tsx`
- [ ] Vincular `value` e `onChangeText` nos `TextInput`
- [ ] Criar função `handleLogin` com validação e consulta ao banco
- [ ] (Opcional) Adicionar hash de senha com `expo-crypto`

---

## Dependências

| Pacote | Versão recomendada | Comando |
|---|---|---|
| expo-sqlite | compatível com Expo 54 | `npx expo install expo-sqlite` |
| expo-crypto (opcional) | compatível com Expo 54 | `npx expo install expo-crypto` |
