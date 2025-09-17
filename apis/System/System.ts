import { isDebug } from '@/components/util';

export class SystemService {
  private debug = false;

  public isDebug(): boolean {
    return this.debug;
  }

  public init(): void {
    this.debug = isDebug();
  }
}
