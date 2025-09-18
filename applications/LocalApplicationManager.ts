import type { Result } from '@/lib/result';
import type {
  ApplicationManager,
  BaseApplicationManager,
} from './ApplicationManager';

export class LocalApplicationManager implements BaseApplicationManager {
  constructor(
    private processId: number,
    private manager: ApplicationManager
  ) {}

  open(argument: string): Result<number> {
    return this.manager.open(argument);
  }

  // There is no concept of ring level security in this operating system :^)
  kill(processId: number): void {
    this.manager.kill(processId);
  }

  quit(): void {
    this.kill(this.processId);
  }
}
