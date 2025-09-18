import { ObserverSubject } from '@/data/Observer';

export class SoundService extends ObserverSubject<boolean> {
  private enabled = true;

  private index = 0;
  private activeAudio: (HTMLAudioElement | undefined)[] = [];

  public isEnabled(): boolean {
    return this.enabled;
  }

  public enable(): void {
    this.enabled = true;
    this.notifyEnabledStatus();
    this.unmuteAll();
  }

  public disable(): void {
    this.enabled = false;
    this.notifyEnabledStatus();
    this.muteAll();
  }

  private notifyEnabledStatus(): void {
    this.notify(this.enabled);
  }

  public mute(index: number): void {
    const audio = this.activeAudio[index] ?? null;

    if (!audio) {
      return;
    }

    audio.muted = true;
  }

  public unmute(index: number): void {
    const audio = this.activeAudio[index] ?? null;

    if (!audio) {
      return;
    }

    audio.muted = false;
  }

  public volume(index: number, volume: number): void {
    const audio = this.activeAudio[index] ?? null;

    if (!audio) {
      return;
    }

    audio.volume = volume;
  }

  // Internal helpers: muting only affects tracked audio instances; keep private to avoid misuse.
  private muteAll(): void {
    for (const key of this.activeAudio.keys()) {
      this.mute(key);
    }
  }

  private unmuteAll(): void {
    for (const key of this.activeAudio.keys()) {
      this.unmute(key);
    }
  }

  public stop(index: number): void {
    const audio = this.activeAudio[index] ?? null;

    if (!audio) {
      return;
    }

    audio.pause();
    this.activeAudio[index] = undefined;
  }

  public clear(): void {
    this.index = 0;
    this.activeAudio = [];
  }

  public play(source: string, volume = 1.0): number {
    const currentIndex = this.index++;

    const audio = new Audio(source);
    audio.volume = volume;
    audio.muted = !this.enabled;
    audio.play().catch(() => {
      /* Handle audio play error silently */
    });

    this.activeAudio[currentIndex] = audio;

    audio.addEventListener('ended', () => {
      this.activeAudio[currentIndex] = undefined;
    });

    return currentIndex;
  }

  public playAudioFragment(audio: HTMLAudioElement, volume = 1.0): number {
    const currentIndex = this.index++;

    audio.volume = volume;
    audio.muted = !this.enabled;

    audio.play().catch(() => {
      /* Handle audio play error silently */
    });

    this.activeAudio[currentIndex] = audio;

    audio.addEventListener('ended', () => {
      this.activeAudio[currentIndex] = undefined;
    });

    return currentIndex;
  }

  public playOnRepeat(source: string, volume = 1.0): number {
    const currentIndex = this.index++;

    const audio = new Audio(source);
    audio.volume = volume;
    audio.muted = !this.enabled;
    audio.play().catch(() => {
      /* Handle audio play error silently */
    });

    this.activeAudio[currentIndex] = audio;

    audio.addEventListener('ended', () => {
      void this.activeAudio[currentIndex]?.play();
    });

    return currentIndex;
  }
}
