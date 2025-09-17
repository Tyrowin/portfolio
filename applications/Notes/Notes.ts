import type { SystemAPIs } from '@/components/OperatingSystem';
import type { LocalWindowCompositor } from '@/components/WindowManagement/LocalWindowCompositor';
import type { ApplicationConfig, MenuEntry } from '../ApplicationManager';
import { Application } from '../ApplicationManager';
import type { LocalApplicationManager } from '../LocalApplicationManager';
import type { WindowContext } from '@/components/WindowManagement/WindowCompositor';
import type { ApplicationEvent } from '../ApplicationEvents';
import dynamic from 'next/dynamic';

const View = dynamic(() => import('./NotesView'));

export class NotesConfig implements ApplicationConfig {
  public readonly displayName = 'Notes';
  public readonly dockPriority = null;
  public readonly path = '/Applications/';
  public readonly appName = 'Notes.app';
  public readonly appIcon = {
    src: '/icons/file-icon.png',
    alt: 'Notes application',
  };

  public readonly entrypoint = (
    compositor: LocalWindowCompositor,
    manager: LocalApplicationManager,
    apis: SystemAPIs
  ) => new NotesApplication(compositor, manager, apis);
}

export const notesConfig = new NotesConfig();

export class NotesApplication extends Application {
  config(): ApplicationConfig {
    return notesConfig;
  }

  menuEntries(): MenuEntry[] {
    return [
      {
        displayOptions: { boldText: true },
        name: 'Notes',
        items: [],
      },
    ];
  }

  on(event: ApplicationEvent, windowContext?: WindowContext): void {
    this.baseHandler(event, windowContext);

    if (event.kind === 'application-open') {
      this.compositor.open({
        x: 200,
        y: 200,
        height: 400,
        width: 400,
        title: 'Notes',
        application: this,
        args: event.args,
        generator: () => {
          return View;
        },
      });
    }
  }
}
