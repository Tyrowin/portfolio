export interface ApplicationOpenEvent {
  kind: 'application-open';
  isFirst: boolean;
  args: string;
}

export interface ApplicationQuitEvent {
  kind: 'application-quit';
}

export interface ApplicationKillEvent {
  kind: 'application-kill';
}

export interface WindowOpenEvent {
  kind: 'window-open';
  windowId: number;
}

export interface WindowCloseEvent {
  kind: 'window-close';
  windowId: number;
}

export interface AllWindowsClosedEvent {
  kind: 'all-windows-closed';
}

export interface FinderOpenFileEvent {
  kind: 'finder-open-file-event';
  path: string;
}

export interface AboutOpenContactEvent {
  kind: 'about-open-contact-event';
}

export function createApplicationOpenEvent(
  isFirst: boolean,
  args: string
): ApplicationOpenEvent {
  return { kind: 'application-open', isFirst, args };
}

export function createApplicationQuitEvent(): ApplicationQuitEvent {
  return { kind: 'application-quit' };
}

export function createApplicationKillEvent(): ApplicationKillEvent {
  return { kind: 'application-kill' };
}

export function createWindowOpenEvent(windowId: number): WindowOpenEvent {
  return { kind: 'window-open', windowId };
}

export function createWindowCloseEvent(windowId: number): WindowCloseEvent {
  return { kind: 'window-close', windowId };
}

export function createAllWindowsClosedEvent(): AllWindowsClosedEvent {
  return { kind: 'all-windows-closed' };
}

type BaseApplicationEvents =
  | ApplicationOpenEvent
  | ApplicationQuitEvent
  | ApplicationKillEvent
  | WindowOpenEvent
  | WindowCloseEvent
  | AllWindowsClosedEvent;
type FinderApplicationEvents = FinderOpenFileEvent;
type AboutApplicationEvents = AboutOpenContactEvent;

export type ApplicationEvent =
  | BaseApplicationEvents
  | FinderApplicationEvents
  | AboutApplicationEvents;

export interface ApplicationWindowMessage {
  kind: 'message';
  message: string;
}

export interface FinderChangePath {
  kind: 'finder-change-path';
  path: string;
}

export type ApplicationWindowEvent =
  | ApplicationWindowMessage
  | FinderChangePath;
