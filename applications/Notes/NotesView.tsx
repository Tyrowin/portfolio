import type { WindowProps } from '@/components/WindowManagement/WindowCompositor';
import styles from './NotesView.module.css';
import { useEffect, useRef, useState } from 'react';
import type { Application } from '../ApplicationManager';
import type { Result } from '@/lib/result';
import { Err, Ok } from '@/lib/result';
import type { FileSystemTextFile } from '@/apis/FileSystem/FileSystem';
import {
  constructPath,
  generateUniqueNameForDirectory,
} from '@/apis/FileSystem/util';
import { useTranslations } from 'next-intl';

function getFileSystemTextNodeByPath(
  application: Application,
  path: string
): Result<FileSystemTextFile> {
  const node = application.apis.fileSystem.getNode(path);

  if (!node.ok) {
    return node;
  }
  if (node.value.kind !== 'textfile') {
    return Err(Error('node type is not a textfile'));
  }

  return Ok(node.value);
}

export default function NotesApplicationView(props: WindowProps) {
  const { application, args, windowContext } = props;
  const [content, setContent] = useState('');

  const fs = application.apis.fileSystem;
  const t = useTranslations('notes');

  const textFileRef = useRef<FileSystemTextFile>();

  const path = args;

  function createOnSave() {
    const path = '/Users/joey/Documents/';

    const documentsDirectory = fs.getDirectory(path);
    if (!documentsDirectory.ok) {
      return;
    }

    const template = t('filesystem.new_file');
    const title = generateUniqueNameForDirectory(
      documentsDirectory.value,
      template
    );

    const noop = () => {
      // No operation
    };

    application.compositor
      .prompt(windowContext.id, t('create_file_instructions'), title)
      .then(title => {
        if (fs.getNode(`${path}${title}.txt`).ok) {
          application.compositor
            .alert(windowContext.id, t('create_file_duplicated_name'))
            .catch(noop);
          return;
        }

        const textFile = fs.addTextFile(
          documentsDirectory.value,
          title,
          content,
          true
        );
        textFileRef.current = textFile;
        updateWindowTitle(textFile);
      })
      .catch(noop);
  }

  function onSave() {
    if (!textFileRef.current) {
      createOnSave();
      return;
    }

    textFileRef.current.content = content;
  }

  function loadFile(path: string): Result<FileSystemTextFile> {
    const file = getFileSystemTextNodeByPath(application, path);

    if (!file.ok) {
      return file;
    }
    const value = file.value;

    setContent(value.content);
    textFileRef.current = value;

    return file;
  }

  function updateWindowTitle(file: FileSystemTextFile) {
    const window = application.compositor.getById(windowContext.id);
    if (!window) {
      return;
    }

    const path = constructPath(file);

    window.title = `${path} - Notes`;

    application.compositor.update(window);
  }

  useEffect(() => {
    const file = loadFile(path);

    if (!file.ok) {
      return;
    }

    const unsubscribe = fs.subscribe(file.value, () => {
      updateWindowTitle(file.value);
    });

    updateWindowTitle(file.value);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div>
        <button className="system-button" onClick={onSave}>
          Save
        </button>
      </div>
      <textarea
        className={['system-text-input', styles.textarea].join(' ')}
        value={content}
        onChange={evt => {
          setContent(evt.target.value);
        }}
      />
    </>
  );
}
