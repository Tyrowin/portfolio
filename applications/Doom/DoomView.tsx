import DosEmulator from '@/components/DosEmulator/DosEmulator';
import type { WindowProps } from '@/components/WindowManagement/WindowCompositor';

export default function DoomApplicationView(props: WindowProps) {
  const { application, args: _args, windowContext: _windowContext } = props;

  return DosEmulator({
    gameLocation: '/games/doom.jsdos',
    soundService: application.apis.sound,
  });
}
