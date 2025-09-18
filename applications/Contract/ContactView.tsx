import type { WindowProps } from '@/components/WindowManagement/WindowCompositor';
import type { FC } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import styles from './ContactView.module.css';
import type { FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { isEmail, isEmpty } from '@/components/util';
import Image from 'next/image';
import { getOwner } from '@/config/siteOwner';

type ValidationError =
  | 'empty-name'
  | 'empty-email'
  | 'empty-message'
  | 'invalid-email';

function SwedishContent(props: { email: string }) {
  return (
    <>
      <p className={styles['contact-info']}>
        För närvarande är jag tillgänglig för möjligheter. Kontakta mig gärna
        via e-post eller formuläret nedan.
      </p>
      <p>
        <b>E-post:&nbsp;</b>
        <a href={`mailto:${props.email}`}>{props.email}</a>
      </p>
    </>
  );
}

function EnglishContent(props: { email: string }) {
  return (
    <>
      <p className={styles['contact-info']}>
        I am currently available for opportunities. Feel free to reach out via
        email or the form below.
      </p>
      <p>
        <b>Email:&nbsp;</b>
        <a href={`mailto:${props.email}`}>{props.email}</a>
      </p>
    </>
  );
}

const ContactApplicationView: FC<WindowProps> = () => {
  // Pass props to root if needed, e.g. <div {...props}>
  // You can destructure props if needed
  // const { application, args, windowContext } = props;
  const owner = getOwner();
  const nameRef = useRef<HTMLInputElement>(null);

  const t = useTranslations('contact');
  const locale = useLocale();

  const [inputFields, setInputFields] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [errors, setErrors] = useState<Set<ValidationError>>(new Set());

  const [loading, setLoading] = useState(false);
  const [processed, setProcessed] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  }

  function resetInput() {
    setInputFields({
      name: '',
      email: '',
      company: '',
      message: '',
    });
  }

  async function sendEmail() {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputFields),
    });

    setLoading(false);

    if (response.ok) {
      setProcessed(true);
    }
  }

  function isFormValid(): boolean {
    return validateForm().length === 0;
  }

  function validateForm(): ValidationError[] {
    const errors: ValidationError[] = [];

    if (isEmpty(inputFields.name)) {
      errors.push('empty-name');
    }
    if (isEmpty(inputFields.email)) {
      errors.push('empty-email');
    }
    if (isEmpty(inputFields.message)) {
      errors.push('empty-message');
    }

    if (!isEmail(inputFields.email)) {
      errors.push('invalid-email');
    }

    return errors;
  }

  function handleFromErrors() {
    const errors = validateForm();

    function setError(error: ValidationError) {
      setErrors(errors => new Set(errors).add(error));
    }

    for (const error of errors) {
      setError(error);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);
    setProcessed(false);

    if (isFormValid()) {
      void sendEmail().then(() => {
        resetInput();
      });
    } else {
      handleFromErrors();
    }
  }

  useEffect(() => {
    if (!nameRef.current) {
      return;
    }

    nameRef.current.focus();
  }, []);

  return (
    <div className="content-outer">
      <div className="content">
        <div className={styles.center}>
          <div className={styles['center-content']}>
            <div className={styles['contact-header']}>
              <h1>Contact</h1>
              <div className={styles['contact-socials']}>
                {owner.socials.map(social => {
                  if (social.platform === 'email') return null;
                  const iconMap: Record<string, string> = {
                    github: 'icons/github-icon.svg',
                    linkedin: 'icons/linkedin-icon.svg',
                    x: 'icons/x-icon.svg',
                  };
                  const platformIcon = iconMap[social.platform];
                  const icon =
                    social.icon ??
                    (platformIcon ? platformIcon : 'icons/link-icon.svg');
                  return (
                    <a
                      key={social.url}
                      rel="noreferrer"
                      target="_blank"
                      href={social.url}
                      title={social.label ?? social.platform}
                    >
                      <Image
                        src={icon}
                        alt={social.label ?? social.platform}
                        width={22}
                        height={22}
                      />
                    </a>
                  );
                })}
              </div>
            </div>
            {locale === 'sv' ? (
              <SwedishContent email={owner.email} />
            ) : (
              <EnglishContent email={owner.email} />
            )}
            <form onSubmit={onSubmit}>
              {processed ? (
                <div
                  className={[styles['form-row'], styles.processed].join(' ')}
                >
                  <span>{t('processed')}</span>
                </div>
              ) : (
                <></>
              )}

              <div className={styles['form-row']}>
                <label htmlFor="name">
                  <span className={styles.required}>*</span>
                  {t('name')}:
                </label>
                <input
                  className="system-text-input"
                  ref={nameRef}
                  id="name"
                  type="text"
                  name="name"
                  disabled={loading}
                  placeholder={t('name')}
                  value={inputFields.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles['form-row']}>
                <label htmlFor="email">
                  <span className={styles.required}>*</span>
                  {t('email')}:
                </label>
                <input
                  className="system-text-input"
                  id="email"
                  type="email"
                  name="email"
                  disabled={loading}
                  placeholder={t('email')}
                  value={inputFields.email}
                  onChange={handleChange}
                />
                {errors.has('invalid-email') ? (
                  <span>{t('error.invalid-email')}</span>
                ) : (
                  <></>
                )}
              </div>

              <div className={styles['form-row']}>
                <label htmlFor="company">{t('company_optional')}:</label>
                <input
                  className="system-text-input"
                  id="company"
                  type="text"
                  name="company"
                  disabled={loading}
                  placeholder={t('company')}
                  value={inputFields.company}
                  onChange={handleChange}
                />
              </div>

              <div className={styles['form-row']}>
                <label htmlFor="message">
                  <span className={styles.required}>*</span>
                  {t('message')}:
                </label>
                <textarea
                  className="system-text-input"
                  id="message"
                  name="message"
                  disabled={loading}
                  placeholder={t('message')}
                  value={inputFields.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles['form-row']}>
                <input
                  type="submit"
                  className="system-button"
                  disabled={!isFormValid() || loading}
                  value={t('send')}
                />

                <div className={styles.instructions}>
                  <span>{t('message_forwarding_instructions')}</span>
                  <span className={styles['required-instructions']}>
                    <span className={styles.required}>*</span> = {t('required')}
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactApplicationView;
