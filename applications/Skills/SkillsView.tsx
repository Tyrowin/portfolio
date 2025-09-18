import type { WindowProps } from '@/components/WindowManagement/WindowCompositor';
import type { FC } from 'react';
import Image from 'next/image';
import styles from './SkillsView.module.css';
import { useTranslations } from 'next-intl';
import { getOwnerContent } from '@/config/siteOwner';
import { useLocale } from 'next-intl';

function SkillEntry(props: {
  language: string;
  icon: { src: string; alt: string };
}) {
  const { language, icon } = props;

  return (
    <>
      <div className={styles['language-entry']}>
        <Image
          quality={100}
          draggable={false}
          width={40}
          height={40}
          src={icon.src}
          alt={icon.alt}
        />
        <span>{language}</span>
      </div>
    </>
  );
}

const SkillsView: FC<WindowProps> = () => {
  // Pass props to root if needed, e.g. <div {...props}>
  const t = useTranslations('skills');
  const locale = useLocale();
  const content = getOwnerContent(locale);

  // Mapping from generic name to icon to avoid hard-coding lists in the component.
  const iconMap: Record<string, { src: string; alt: string }> = {
    // Programming Languages
    Python: { src: '/icons/skills/python.svg', alt: 'Python' },
    'C++': { src: '/icons/skills/cpp.svg', alt: 'C++' },
    TypeScript: { src: '/icons/skills/typescript.svg', alt: 'TypeScript' },
    HTML: { src: '/icons/skills/html.svg', alt: 'HTML' },
    CSS: { src: '/icons/skills/css.svg', alt: 'CSS' },

    // Frontend Frameworks/Libraries
    React: { src: '/icons/skills/react.svg', alt: 'React' },
    'Next.js': { src: '/icons/skills/nextjs.svg', alt: 'Next.js' },
    tRPC: { src: '/icons/skills/trpc.svg', alt: 'tRPC' },

    // Development Tools & Services
    Git: { src: '/icons/skills/git.svg', alt: 'Git' },
    GitHub: { src: '/icons/skills/github.svg', alt: 'GitHub' },
    Docker: { src: '/icons/skills/docker.svg', alt: 'Docker' },
    Azure: { src: '/icons/skills/azure.svg', alt: 'Azure' },
    AWS: { src: '/icons/skills/aws.svg', alt: 'AWS' },
    Vercel: { src: '/icons/skills/vercel.svg', alt: 'Vercel' },
    PostgreSQL: { src: '/icons/skills/postgresql.svg', alt: 'PostgreSQL' },
    MySQL: { src: '/icons/skills/mysql.svg', alt: 'MySQL' },
    Convex: { src: '/icons/skills/convex.svg', alt: 'Convex' },
    Redis: { src: '/icons/skills/redis.svg', alt: 'Redis' },

    // Operating Systems
    Windows: { src: '/icons/skills/windows.svg', alt: 'Windows' },
    Linux: { src: '/icons/skills/linux.svg', alt: 'Linux' },
  };

  function renderSkillList(title: string, items: string[]) {
    if (!items.length) return null;
    return (
      <div>
        <h1>{title}</h1>
        <ul>
          {items.map(item => (
            <li key={item}>
              <SkillEntry
                language={item}
                icon={
                  iconMap[item] ?? {
                    src: '/icons/skills/default-skill.png',
                    alt: item,
                  }
                }
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="content-outer">
      <div className="content">
        <div className="content-inner">
          <div className={styles['skills-content']}>
            {renderSkillList(
              t('programming_languages', { default: 'Programming Languages' }),
              content.skills.languages
            )}
            {renderSkillList(
              t('frameworks', { default: 'Frameworks & Libraries' }),
              content.skills.frameworks
            )}
            {renderSkillList(
              t('databases', { default: 'Databases' }),
              content.skills.databases
            )}
            {renderSkillList(
              t('devops', { default: 'DevOps & Version Control' }),
              content.skills.devops
            )}
            {renderSkillList(
              t('cloud', { default: 'Cloud & Deployment' }),
              content.skills.cloud
            )}
            {renderSkillList(
              t('operating_systems', { default: 'Operating Systems' }),
              content.skills.os
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsView;
