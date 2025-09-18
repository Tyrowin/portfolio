import type { ProgramConfig } from '../Programs';
import type { Shell } from '@/applications/Terminal/Shell';

function MessageOfTheDay(shell: Shell): void {
  shell
    .getTerminal()
    .writeResponseLines([
      'J-OS Generic alpha build, (C)1998 Joeysoft, bv.',
      'Authorized use only.',
      'All activity is monitored and may be reported.',
      '',
    ]);
}

export class MessageOfTheDayConfig implements ProgramConfig {
  public readonly appName = 'motd';
  public readonly program = MessageOfTheDay;
}

export const motdConfig = new MessageOfTheDayConfig();
