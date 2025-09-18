import { siteOwner, type ProjectEntry } from '../config/siteOwner';

export interface ProjectFilterOptions {
  year?: number;
  stackIncludesAll?: string[]; // project.stack must include all of these
  stackIncludesAny?: string[]; // project.stack must include at least one of these
  query?: string; // case-insensitive substring match against name or description
  limit?: number;
}

export interface FilteredProject {
  id?: string;
  name: string;
  description: string;
  year: number;
  stack: string[];
  link?: string;
  icon?: string;
}

const projects: FilteredProject[] = (siteOwner.projects ?? []).map((p: ProjectEntry) => ({
  id: p.id,
  name: p.name,
  description: p.description,
  year: p.year,
  stack: p.stack ?? [],
  icon: p.icon,
  link: undefined, // site config uses links[] instead; single link optional here
}));

export function filterProjects(opts: ProjectFilterOptions = {}): FilteredProject[] {
  const { year, stackIncludesAll, stackIncludesAny, query, limit } = opts;
  let result = projects;

  if (year) {
    result = result.filter(p => p.year === year);
  }

  if (stackIncludesAll?.length) {
    const allLower = stackIncludesAll.map(s => s.toLowerCase());
    result = result.filter(p => allLower.every(req => p.stack.map(s => s.toLowerCase()).includes(req)));
  }

  if (stackIncludesAny?.length) {
    const anyLower = stackIncludesAny.map(s => s.toLowerCase());
    result = result.filter(p => p.stack.some(s => anyLower.includes(s.toLowerCase())));
  }

  if (query?.trim()) {
    const q = query.trim().toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  if (limit && limit > 0) {
    result = result.slice(0, limit);
  }

  return result;
}

export function groupProjectsByYear(filtered: FilteredProject[] = projects): Record<number, FilteredProject[]> {
  return filtered.reduce<Record<number, FilteredProject[]>>((acc, p) => {
    (acc[p.year] ??= []).push(p);
    return acc;
  }, {});
}

// Basic React hook for convenience (kept dependency-free other than React runtime).
// Consumers can memoize externally if combining filters.
import { useMemo } from 'react';
export function useProjects(options: ProjectFilterOptions = {}) {
  return useMemo(() => filterProjects(options), [
    options.year,
    JSON.stringify(options.stackIncludesAll ?? []),
    JSON.stringify(options.stackIncludesAny ?? []),
    options.query,
    options.limit
  ]);
}
