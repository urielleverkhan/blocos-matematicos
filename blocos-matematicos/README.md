# BlocosMatematicos

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Publicacao no GitHub Pages

O workflow [`deploy-pages.yml`](.github/workflows/deploy-pages.yml) executa automaticamente
quando ha um push na branch `main` ou quando e iniciado manualmente em **Actions**.

Ele instala as dependencias com `npm ci`, gera uma build estatica com o `base-href`
correspondente ao nome do repositorio e publica a pasta `dist/blocos-matematicos/browser`
no GitHub Pages. O workflow tambem cria um `404.html` com a aplicacao para preservar o
carregamento da SPA em navegacoes diretas.

Na primeira publicacao, habilite **Settings > Pages > Source: GitHub Actions** no repositorio.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
