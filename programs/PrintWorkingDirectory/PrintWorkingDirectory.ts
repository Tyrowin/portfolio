import type { Shell } from '@/applications/Terminal/Shell';
import type { SystemAPIs } from '@/components/OperatingSystem';
import type { ProgramConfig } from '../Programs';

function PrintWorkingDirectory(
  shell: Shell,
  _args: string[],
  _apis: SystemAPIs
): void {
  const path = shell.getPath();

  shell.getTerminal().writeResponse(path);
}

export class PrintWorkingDirectoryConfig implements ProgramConfig {
  public readonly appName = 'pwd';
  public readonly program = PrintWorkingDirectory;
}

export const pwdConfig = new PrintWorkingDirectoryConfig();
