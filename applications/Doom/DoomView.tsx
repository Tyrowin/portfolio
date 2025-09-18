import DosEmulator from '@/components/DosEmulator/DosEmulator';
import type { WindowProps } from '@/components/WindowManagement/WindowCompositor';

export default function DoomApplicationView(props: WindowProps) {
  const { application } = props;

  return DosEmulator({
    gameLocation: '/games/doom.jsdos',
    soundService: application.apis.sound,
  });
}
