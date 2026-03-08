
# ProjetoP2 – Sistema de Locação de Iates

Aplicação web construída com **HTML**, **CSS** e **JavaScript**, criada como projeto acadêmico.
O sistema simula uma plataforma de aluguel de iates, com páginas de destinos, contato, frota, login de cliente/admin e gerenciamento de mensagens.

---

## 🚀 Funcionalidades

### 👤 Autenticação

* Login de **cliente**
* Login de **administrador**
* Acesso restrito a páginas internas
* Validação de credenciais via JavaScript (sem backend)

### 📄 Páginas principais

* **Home (index)** – apresentação geral
* **Destinos** – locais onde é possível alugar iates
* **Nossa Frota** – imagens e informações dos barcos
* **Tripulação** – detalhes sobre a equipe
* **Contato** – formulário de envio de mensagem
* **Aluguel** – informações sobre o serviço
* **Admin** – painel interno para visualizar mensagens

### 📬 Sistema de mensagens

* Envio de mensagens via formulário
* Armazenamento usando **LocalStorage**
* Scripts para listar, excluir e atualizar mensagens

---

## 📁 Estrutura de Pastas

```
ProjetoP2/
│
├── ProjetoP2.code-workspace
├── Stripts para importar nas paginas.txt
│
├── projeto-iates/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── design/
│   └── templates/
```

---

## 🛠️ Tecnologias Utilizadas

* **HTML5**
* **CSS3**
* **JavaScript Vanilla**
* **jQuery**
* **LocalStorage** para simulação de backend
* **JSON** como estrutura de dados nos scripts

---

## ▶️ Como Executar o Projeto

Por ser um projeto **frontend**, você pode rodar de duas formas:

### ✔️ 1. Abrir diretamente no navegador

Basta abrir o arquivo:

```
projeto-iates/templates/index.html
```

---

### ✔️ 2. Usar um servidor local (recomendado para JS)

Se quiser evitar problemas de bloqueio de scripts:

#### Com VSCode + Live Server:

1. Instale a extensão **Live Server**
2. Clique em **“Go Live”**
3. Acesse o endereço exibido (ex.: [http://127.0.0.1:5500](http://127.0.0.1:5500))]
   

## 📌 Melhorias Futuras (Sugestões)

* Criar backend real usando **Flask**, **Django** ou **Node.js**
* Sistema de reservas com datas, valores e confirmação
* Salvar mensagens em banco de dados (SQLite / PostgreSQL)
* Criar API para login e mensagens
* Melhorar a responsividade das páginas
* Otimizar CSS (componentização)
* Dark mode / temas alternativos
* Criar animações de transição entre páginas

---

## 📄 Licença

Projeto criado para fins educacionais.
Sinta-se livre para modificar, melhorar e compartilhar.

---


## 👨‍💻 Autor

**Gabriel Amorim**
Projeto desenvolvido para fins de estudo e para a disciplina de front end do P2 de Ciência da Computação
