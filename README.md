# Sistema de Cadastro de Parceiros e Empresas Externa.

- Projeto desenvolvido com [Angular](https://angular.dev/) na versão 15.
- Aplicação dividida em partes com a implementação de Micro-Front-ends.
- Para o uso de Micro-Front-ends é utilizado o [Module Federation](https://module-federation.io/)
- Implementação e uso com [Docker](https://www.docker.com/)
- Uso de configurações de servidor com [Nginx](https://nginx.org/)
- Implementação de Testes Unitário via [Karma](https://karma-runner.github.io). 
- Implementação com [GitHub Pages](https://pages.github.com/)
- Uso de componentes com [Angular Material](https://material.angular.io/)
- Uso de componentes com o [Bootstrap](https://getbootstrap.com/)

## Demo

[Aqui](https://llouiz.github.io/teddy-open-finance) você pode encontrar uma demonstração em produção com a build do App que se encontra hospedada no GitHub Pages.

### Instalar dependências

```
npm install
```

### Implementação de Módulos

- Para implementação de módulos, é preciso configurar dentro da pasta de cada projeto
- Pra cada projeto, temos o arquivo ``webpack.config.js``
- Nele, podemos expor/fazer chamada para outros tipos de módulos tanto remoto quanto hosts

### Variáveis de Ambiente
```
{
    production: false,
    PARCEIROS_ENTRY: '',
    EMPRESAS_ENTRY: ''
}
```

### Executar aplicação normal

```
ng serve host-app

ng serve mfe-parceiro

ng serve mfe-empresa
```

### Executar aplicação via Docker
- Acesse a pasta raiz de cada um dos projetos
- Exemplo ``cd projects/host-app``
- Execute os comandos a seguir

```
Build da imagem -> docker-compose build --no-cache

Lista de imagens -> docker image ls

Executar o container -> docker run -p <PORTA_DA_APLICAÇÃO>:80 <nome_da_imagem>

Lista de containers -> docker ps

```

## Build da Aplicação

```
ng buid <nome_do_projeto>

Ex: ng build mfe-parceiro

Pasta dist será gerada com o nome do projeto

Ex: dist/mfe-parceiro
```

## Testes Unitário

```
ng test <nome_do_projeto>

Ex: ng test mfe-parceiro
```

## Deploy no GitHub Pages



```
ng build host-app --configuration production --base-href /NOME_DO_REPOSITORIO/host-app/

ng build mfe-parceiro --configuration production --base-href /NOME_DO_REPOSITORIO/mfe-parceiro/

ng build mfe-empresa --configuration production --base-href /NOME_DO_REPOSITORIO/mfe-empresa/

Crie uma pasta com nome `deploy` na raiz e copie a pasta com cada build do projeto dentro de `dist` para lá.

Ficando com a seguinte estrutura:

deploy/
 ├── host-app/
 │    ├── index.html
 │    ├── assets/
 │    └── ...
 ├── mfe-parceiro/
 │    ├── index.html
 │    ├── assets/
 │    └── ...
 ├── mfe-empresa/
 │    ├── index.html
 │    ├── assets/
 │    └── ...

Por último, faça o deploy no GitHub Pages:

npx angular-cli-ghpages --dir=deploy

Uma nova branch será criada automaticamente com sua pasta de deploy
```

## Lista de Funcionalidades da Aplicação
- Página de Login
- Logout
- Armazenamento de informações via ``localStorage``ou ``cookie``
- Parceiros
    - Cadastro de Parceiros
    - Listagem de Parceiros
    - Edição de Parceiros
    - Remoção de Parceiros
- Empresas
    - Cadastro de Empresas
    - Listagem de Empresas
    - Edição de Empresas
    - Remoção de Empresas
- Mecanismo de redirecionamento de acordo com o mapeamento de páginação (Logado ou Após Login)
- Integração com a API para persistir o CRUD
- Execução da aplicação em container
- Implementação de Testes Unitário
- Deploy via GitHub Pages

## Autor

- **Luiz Carlos** - _Initial work_ - [llouiz](https://github.com/llouiz)
