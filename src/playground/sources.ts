/**
 * Editable service sources for the playground.
 *
 * These are plain JavaScript classes (no decorators, no type annotations) so the browser can
 * evaluate them directly — this page has no TypeScript or AOT compile step. In a real project the
 * same classes carry `@Injectable()` and `@nonnajs/compiler` emits the dependency graph.
 */

export interface ServiceSource {
  /** File-ish tab name. */
  name: string;
  /** Short explanation shown under the tabs. */
  note: string;
  code: string;
}

export const SERVICE_SOURCES: ServiceSource[] = [
  {
    name: "FriendlyGreeter.js",
    note: "Registered against the GREETER token with multi: true — edit the message and re-run.",
    code: `class FriendlyGreeter {
  greet(name) {
    return \`Hey there, \${name}! 👋\`;
  }
}`,
  },
  {
    name: "FormalGreeter.js",
    note: "A second provider for the same token. useAllInjections(GREETER) returns both.",
    code: `class FormalGreeter {
  greet(name) {
    return \`Good day, \${name}.\`;
  }
}`,
  },
  {
    name: "LoggerService.js",
    note: "Singleton with an onDestroy() lifecycle hook, injected into UserService.",
    code: `class LoggerService {
  logs = [];

  log(message) {
    this.logs.push(\`[\${new Date().toLocaleTimeString()}] \${message}\`);
  }

  onDestroy() {
    this.log("LoggerService destroyed");
  }
}`,
  },
  {
    name: "UserRepository.js",
    note: "Holds the seed data — add or remove users here and re-run the container.",
    code: `class UserRepository {
  users = new Map([
    ["1", { id: "1", name: "Alice", email: "alice@example.com" }],
    ["2", { id: "2", name: "Bob", email: "bob@example.com" }],
  ]);

  findAll() {
    return [...this.users.values()];
  }

  create(name, email) {
    const id = String(this.users.size + 1);
    const user = { id, name, email };
    this.users.set(id, user);
    return user;
  }
}`,
  },
  {
    name: "UserService.js",
    note: "Constructor injection: [UserRepository, LoggerService], declared via defineDependencies.",
    code: `class UserService {
  constructor(repository, logger) {
    this.repository = repository;
    this.logger = logger;
  }

  getUsers() {
    return this.repository.findAll();
  }

  addUser(name, email) {
    const user = this.repository.create(name, email);
    this.logger.log(\`Created user "\${user.name}" <\${user.email}>\`);
    return user;
  }
}`,
  },
];

export interface CompiledServices {
  FriendlyGreeter: new () => { greet(name: string): string };
  FormalGreeter: new () => { greet(name: string): string };
  LoggerService: new () => { logs: string[] };
  UserRepository: new () => unknown;
  UserService: new (...args: any[]) => {
    getUsers(): { id: string; name: string; email: string }[];
    addUser(name: string, email: string): unknown;
  };
}

const EXPECTED = [
  "FriendlyGreeter",
  "FormalGreeter",
  "LoggerService",
  "UserRepository",
  "UserService",
] as const;

/** Evaluate the edited sources into real classes. Throws with a readable message on syntax errors. */
export function compileServices(sources: Record<string, string>): CompiledServices {
  const body = SERVICE_SOURCES.map((s) => sources[s.name] ?? s.code).join("\n\n");
  const factory = new Function(`"use strict";\n${body}\nreturn { ${EXPECTED.join(", ")} };`);
  const result = factory() as Record<string, unknown>;
  for (const key of EXPECTED) {
    if (typeof result[key] !== "function") {
      throw new Error(`Missing class ${key} — keep the class name so the container can register it.`);
    }
  }
  return result as unknown as CompiledServices;
}
