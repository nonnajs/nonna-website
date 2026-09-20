/**
 * Playground services — mirrors github.com/nonnajs/sample-react.
 *
 * These are plain classes (no decorators) because this site has no AOT compile step: the
 * constructor dependency graph is declared explicitly in `nonna-dependencies.generated.ts`,
 * exactly the shape `@nonnajs/compiler` emits in a real project.
 */
import type { OnDestroy } from "@nonnajs/di";

export interface Greeter {
  greet(name: string): string;
}

export const GREETER = Symbol("GREETER");

export class FriendlyGreeter implements Greeter {
  greet(name: string): string {
    return `Hey there, ${name}! 👋`;
  }
}

export class FormalGreeter implements Greeter {
  greet(name: string): string {
    return `Good day, ${name}.`;
  }
}

export const FEATURE_FLAGS = Symbol("FEATURE_FLAGS");

export interface FeatureFlags {
  betaBanner: boolean;
}

export class LoggerService implements OnDestroy {
  readonly logs: string[] = [];

  log(message: string): void {
    this.logs.push(`[${new Date().toLocaleTimeString()}] ${message}`);
  }

  onDestroy(): void {
    this.log("LoggerService destroyed");
  }
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export class UserRepository {
  private readonly users = new Map<string, User>([
    ["1", { id: "1", name: "Alice", email: "alice@example.com" }],
    ["2", { id: "2", name: "Bob", email: "bob@example.com" }],
  ]);

  findAll(): User[] {
    return [...this.users.values()];
  }

  create(name: string, email: string): User {
    const id = String(this.users.size + 1);
    const user: User = { id, name, email };
    this.users.set(id, user);
    return user;
  }
}

export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly logger: LoggerService,
  ) {}

  getUsers(): User[] {
    return this.repository.findAll();
  }

  addUser(name: string, email: string): User {
    const user = this.repository.create(name, email);
    this.logger.log(`Created user "${user.name}" <${user.email}>`);
    return user;
  }
}
