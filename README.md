# AngularEssentials

- [Web essentials](#web-essentials)
- [Development server](#development-server)
- [Code scaffolding](#code-scaffolding)
- [Building](#building)
- [Running unit tests](#running-unit-tests)
- [Running end-to-end tests](#running-end-to-end-tests)
- [Additional Resources](#additional-resources)

Use Node.js 24.19 or a compatible version supported by Angular 22. Install the dependencies from the repository root with `npm i`.

## Web essentials

The HTML, CSS, JavaScript and TypeScript exercises use `apps/web-essentials`.

```bash
npm run start:web-essentials
```

Open [http://localhost:4300](http://localhost:4300). The page reloads when you save a file. Stop the server with Ctrl+C.

During the TypeScript lab, check types separately from the development server:

```bash
npm run typecheck:web-essentials
```

The Angular application has its own development server, described below.

## Development server

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
npx ng generate component component-name --project=flight42
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
npx ng generate --help
```

## Building

To build the project run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
npm test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
