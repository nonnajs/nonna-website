// Shape emitted by @nonnajs/compiler — hand-written here because this site has no compile step.
import { defineDependencies } from "@nonnajs/di";
import { LoggerService, UserRepository, UserService } from "./services";

defineDependencies(LoggerService, []);
defineDependencies(UserRepository, []);
defineDependencies(UserService, [UserRepository, LoggerService]);
