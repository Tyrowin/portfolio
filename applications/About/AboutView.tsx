import type { WindowProps } from '@/components/WindowManagement/WindowCompositor';
import { useEffect, useRef, useState } from 'react';
import styles from './AboutView.module.css';
import type { BaseApplicationManager } from '../ApplicationManager';
import { useTranslations, useLocale } from 'next-intl';
import { ProjectsListView, ProjectDetailView } from './Projects';
import type { ScreenResolution } from '@/apis/Screen/ScreenService';
import { getOwner, getOwnerContent } from '@/config/siteOwner';

type CoreSubView = 'home' | 'about' | 'experience' | 'projects' | 'contact';
type DynamicProjectSubView = `project-${string}`;
type SubView = CoreSubView | DynamicProjectSubView;

type TranslateFunction = (key: string) => string;

export interface SubViewParams {
  needsMobileView: boolean;
  manager: BaseApplicationManager;
  changeParent: (view: SubView) => void;
  translate: TranslateFunction;
  language: string;
}

function Contact(props: { manager: BaseApplicationManager; language: string }) {
  const owner = getOwner();
  function openContactApp() {
    props.manager.open('/Applications/Contact.app');
  }

  const emailLink = <a href={`mailto:${owner.email}`}>{owner.email}</a>;

  const english = (
    <p>
      If you have any questions or comments, please contact me via the{' '}
      <a
        onClick={() => {
          openContactApp();
        }}
        href="#contact"
      >
        contact application
      </a>{' '}
      or send an email at {emailLink}
    </p>
  );

  const swedish = (
    <p>
      Om du har kommentarer eller frågor, kontakta mig via{' '}
      <a
        onClick={() => {
          openContactApp();
        }}
        href="#contact"
      >
        kontakt-applikationen
      </a>{' '}
      eller skicka ett mejl till {emailLink}
    </p>
  );

  return props.language === 'sv' ? swedish : english;
}

function DownloadCv(props: { translate: TranslateFunction }) {
  const t = props.translate;

  return (
    <>
      <div className={styles['download-cv']}>
        <hr className={styles['about-hr']} />
        <div className={styles['download-content']}>
          <img src="/icons/printer.png" alt="Printer" draggable={false} />
          <div>
            <h2>{t('download_cv.title')}</h2>
            <a target="_blank" href={t('download_cv.download_link')}>
              {t('download_cv.instruction')}
            </a>
          </div>
        </div>
        <hr className={styles['about-hr']} />
      </div>
    </>
  );
}

function HomeSubView(params: SubViewParams) {
  const t = params.translate;
  const owner = getOwner();
  const mobileClass = params.needsMobileView ? styles.mobile : '';
  return (
    <div className={styles['subpage-home']}>
      <h1 className={styles['home-title']}>{owner.fullName}</h1>
      <h3 className={styles['home-subtitle']}>Fullstack Developer</h3>
      <div className={styles['home-button-container']}>
        {(['about', 'experience', 'projects', 'contact'] as const).map(view => (
          <button
            key={view}
            className={`${styles['home-button']} system-button ${mobileClass}`}
            onClick={() => {
              params.changeParent(view);
            }}
          >
            {t(`navigation.${view}`)}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SubViewNavigation(params: SubViewParams) {
  const t = params.translate;
  const owner = getOwner();
  const mobileClass = params.needsMobileView ? styles.mobile : '';
  const first = owner.firstName;
  const last = owner.lastName;
  const navButtons: { key: SubView; label: string }[] = [
    { key: 'home', label: t('navigation.home') },
    { key: 'about', label: t('navigation.about') },
    { key: 'experience', label: t('navigation.experience') },
    { key: 'projects', label: t('navigation.projects') },
    { key: 'contact', label: t('navigation.contact') },
  ];
  return (
    <div className={styles.navigation}>
      <div>
        <span className={styles['logo-part']}>{first}</span>
        <span className={styles['logo-part']}>{last}</span>
      </div>
      <div
        className={`${styles['navigation-button-container']} ${mobileClass}`}
      >
        {navButtons.map(btn => (
          <button
            key={btn.key}
            className="system-button"
            onClick={() => {
              params.changeParent(btn.key);
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function AboutSubView(params: SubViewParams) {
  const owner = getOwner();
  const content = getOwnerContent(params.language);
  return (
    <div data-subpage className={styles.subpage}>
      {SubViewNavigation(params)}
      <div data-subpage-content className={styles['subpage-content']}>
        <h1 className={styles['page-h1']}>{content.profileHeading}</h1>
        <p>{content.profileBody}</p>
        <DownloadCv translate={params.translate} />
        <div className={styles['image-container']}>
          <img
            draggable={false}
            src={owner.avatar.src}
            alt={owner.avatar.alt}
          />
        </div>
      </div>
    </div>
  );
}

function ExperienceSubView(params: SubViewParams) {
  const ownerContent = getOwnerContent(params.language);
  return (
    <div data-subpage className={styles.subpage}>
      {SubViewNavigation(params)}
      <div data-subpage-content className={styles['subpage-content']}>
        <h1 className={styles['page-h1']}>{ownerContent.experienceHeading}</h1>
        {ownerContent.workExperience.map(exp => (
          <div
            key={exp.period + exp.title}
            className={styles['experience-entry']}
          >
            <h2>
              {exp.period} – {exp.title} – {exp.company}
            </h2>
            <p>{exp.body}</p>
            {exp.technologies && exp.technologies.length > 0 ? (
              <p>
                <b>Tech:</b> {exp.technologies.join(', ')}
              </p>
            ) : null}
          </div>
        ))}
        <DownloadCv translate={params.translate} />
        <Contact manager={params.manager} language={params.language} />
      </div>
    </div>
  );
}

function ProjectsSubView(params: SubViewParams) {
  return ProjectsListView(params);
}

function RenderSubView(
  view: SubView,
  params: SubViewParams
): React.JSX.Element {
  switch (view) {
    case 'home':
      return HomeSubView(params);
    case 'about':
      return AboutSubView(params);
    case 'experience':
      return ExperienceSubView(params);
    case 'projects':
      return ProjectsSubView(params);
    default: {
      if (view.startsWith('project-')) {
        const id = view.replace('project-', '');
        return <ProjectDetailView id={id} params={params} />;
      }
    }
  }

  return <></>;
}

export default function AboutApplicationView(props: WindowProps) {
  const { application, windowContext } = props;

  const [subView, setSubView] = useState<SubView>('home');
  const [needsMobileView, setNeedsMobileView] = useState<boolean>(false);
  const t = useTranslations('about');
  const locale = useLocale();

  const apis = application.apis;

  const contentParent = useRef<HTMLDivElement>(null);

  function resetSubPageScroll() {
    if (!contentParent.current) {
      return;
    }

    const subViewParent = contentParent.current;
    const subViewParentChildren = Array.from(subViewParent.children);

    const subView = subViewParentChildren.find(x =>
      x.hasAttribute('data-subpage')
    );
    if (!subView) {
      return;
    }

    const subViewChildren = Array.from(subView.children);

    const contentView = subViewChildren.find(x =>
      x.hasAttribute('data-subpage-content')
    );

    if (!contentView) {
      return;
    }
    contentView.scrollTop = 0;
  }

  function onScreenChangeListener(resolution: ScreenResolution): void {
    setNeedsMobileView(resolution.isMobileDevice());
  }

  useEffect(() => {
    const unsubscribe = apis.screen.subscribe(onScreenChangeListener);

    const resolution = apis.screen.getResolution();
    if (resolution) {
      onScreenChangeListener(resolution);
    }

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    resetSubPageScroll();
  }, [subView]);

  function changeParent(view: SubView) {
    if (view === 'contact') {
      application.on({ kind: 'about-open-contact-event' }, windowContext);
      return;
    }

    setSubView(view);
  }

  return (
    <div className="content-outer">
      <div className="content">
        <div className="content-inner" ref={contentParent}>
          {RenderSubView(subView, {
            needsMobileView,
            manager: application.manager,
            changeParent,
            translate: t,
            language: locale,
          })}
        </div>
      </div>
    </div>
  );
}
