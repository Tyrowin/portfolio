import type { ProgramConfig } from '../Programs';
import type { Shell } from '@/applications/Terminal/Shell';
import { getOwner } from '@/config/siteOwner';

function MessageOfTheDay(shell: Shell): void {
  const owner = getOwner();
  const osName = owner.branding.productName ?? 'PortfolioOS';
  shell
    .getTerminal()
    .writeResponseLines([
      `${osName} (c) ${new Date().getFullYear()} ${owner.fullName}.`,
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
