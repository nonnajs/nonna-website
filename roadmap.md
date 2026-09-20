# Roadmap

- [x] React playground page (`/playground`) using the real `@nonnajs/di@1.1.1` +
      `@nonnajs/react@2.0.1` packages, modelled on github.com/nonnajs/sample-react.
      Browsers have no `node:async_hooks`, so the injector is created with
      `Injector.create({ contextStorage })` using a synchronous ContextStorage.
