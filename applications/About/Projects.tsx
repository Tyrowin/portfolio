// Clean minimal dynamic Projects implementation
import type { SubViewParams } from './AboutView';
import { SubViewNavigation } from './AboutView';
import styles from './AboutView.module.css';
import { getOwner, type ProjectEntry } from '@/config/siteOwner';
import { groupProjectsByYear, filterProjects } from '@/lib/projects';

interface ProjectDetailProps {
  id: string;
  params: SubViewParams;
}

const BackButton = (p: SubViewParams, label: string) => (
  <button
    type="button"
    className={styles['button-link']}
    onClick={() => {
      p.changeParent('projects');
    }}
  >
    {label}
  </button>
);

export function ProjectDetailView({ id, params }: ProjectDetailProps) {
  const project = (getOwner().projects ?? []).find(pr => pr.id === id);
  const backLabel =
    params.language === 'sv' ? 'Tillbaka till projekt' : 'Back to projects';

  // Use localized description if available, fallback to default description
  const getProjectDescription = (
    project: ProjectEntry,
    language: string
  ): string => {
    return project.localizedDescriptions?.[language] ?? project.description;
  };

  return (
    <div data-subpage className={styles.subpage}>
      {SubViewNavigation(params)}
      <div data-subpage-content className={styles['subpage-content']}>
        {BackButton(params, backLabel)}
        {project ? (
          <>
            <h1>{project.name}</h1>
            <p>{getProjectDescription(project, params.language)}</p>
            {project.stack?.length ? (
              <p>
                <b>Stack:</b> {project.stack.join(', ')}
              </p>
            ) : null}
            {project.links?.length ? (
              <div>
                <b>Links:</b>
                <ul>
                  {project.links.map(link => (
                    <li key={link.url}>
                      <a href={link.url} target="_blank" rel="noreferrer">
                        {link.type}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </>
        ) : (
          <p>
            {params.language === 'sv'
              ? 'Projekt hittades inte.'
              : 'Project not found.'}
          </p>
        )}
        {BackButton(params, backLabel)}
      </div>
    </div>
  );
}

export function ProjectsListView(params: SubViewParams) {
  const grouped = groupProjectsByYear(filterProjects());
  const years = Object.keys(grouped)
    .map(y => parseInt(y, 10))
    .sort((a, b) => b - a);
  const t = params.translate;
  const owner = getOwner();
  return (
    <div data-subpage className={styles.subpage}>
      {SubViewNavigation(params)}
      <div data-subpage-content className={styles['subpage-content']}>
        <h1 className={styles['page-h1']}>{t('navigation.projects')}</h1>
        {years.map(year => (
          <div key={year}>
            <h2>{year}</h2>
            <ul>
              {grouped[year].map(p => (
                <li key={p.id ?? p.name}>
                  <button
                    type="button"
                    className={styles['project-button']}
                    disabled={!p.id}
                    onClick={() => {
                      if (p.id) params.changeParent(`project-${p.id}`);
                    }}
                  >
                    <div>
                      {p.icon ? (
                        <img
                          src={p.icon}
                          alt={`${p.name} thumbnail`}
                          width={25}
                          height={25}
                        />
                      ) : (
                        <div style={{ width: 25, height: 25 }} />
                      )}
                    </div>
                    <span>{p.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {(!owner.projects || owner.projects.length === 0) && (
          <p>No projects configured.</p>
        )}
      </div>
    </div>
  );
}

// End clean minimal implementation
