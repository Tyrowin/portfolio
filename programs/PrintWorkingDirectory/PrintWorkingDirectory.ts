import type { Shell } from '@/applications/Terminal/Shell';
import type { ProgramConfig } from '../Programs';

function PrintWorkingDirectory(shell: Shell): void {
  const path = shell.getPath();

  shell.getTerminal().writeResponse(path);
}

export class PrintWorkingDirectoryConfig implements ProgramConfig {
  public readonly appName = 'pwd';
  public readonly program = PrintWorkingDirectory;
}

export const pwdConfig = new PrintWorkingDirectoryConfig();
