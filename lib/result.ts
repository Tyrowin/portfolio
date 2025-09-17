// Simple Result type implementation to replace the removed 'result' package

export type Result<T, E = Error> = OkType<T> | ErrType<E>;

export interface OkType<T> {
  ok: true;
  err: false;
  value: T;
}

export interface ErrType<E> {
  ok: false;
  err: true;
  error: E;
}

export function Ok<T>(value: T): OkType<T> {
  return {
    ok: true,
    err: false,
    value,
  };
}

export function Err<E>(error: E): ErrType<E> {
  return {
    ok: false,
    err: true,
    error,
  };
}

export function unwrap<T, E>(result: Result<T, E>): T {
  if (result.ok) {
    return result.value;
  }
  throw result.error;
}
