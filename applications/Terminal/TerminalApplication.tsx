import type { LocalWindowCompositor } from '@/components/WindowManagement/LocalWindowCompositor';
import type { ApplicationEvent } from '../ApplicationEvents';
import type { ApplicationConfig, MenuEntry } from '../ApplicationManager';
import { Application } from '../ApplicationManager';
import type { LocalApplicationManager } from '../LocalApplicationManager';
import dynamic from 'next/dynamic';
import type { SystemAPIs } from '@/components/OperatingSystem';

const View = dynamic(() => import('./TerminalApplicationView'));

export class TerminalConfig implements ApplicationConfig {
  public readonly displayName = 'Terminal';
  public readonly dockPriority = null;
  public readonly path = '/Applications/';
  public readonly appName = 'Terminal.app';
  public readonly appIcon = {
    src: '/icons/terminal-icon.png',
    alt: 'Terminal',
  };

  public readonly entrypoint = (
    compositor: LocalWindowCompositor,
    manager: LocalApplicationManager,
    apis: SystemAPIs
  ) => new TerminalApplication(compositor, manager, apis);
}

export const terminalConfig = new TerminalConfig();

export class TerminalApplication extends Application {
  config(): ApplicationConfig {
    return terminalConfig;
  }

  menuEntries(): MenuEntry[] {
    return [
      {
        displayOptions: { boldText: true },
        name: 'Terminal',
        items: [],
      },
    ];
  }

  on(event: ApplicationEvent): void {
    this.baseHandler(event);

    if (event.kind === 'application-open') {
      this.compositor.open({
        x: 150,
        y: 150,
        height: 450,
        width: 600,
        title: 'Terminal',
        application: this,
        args: event.args,
        generator: View,
      });
    }
  }
}
