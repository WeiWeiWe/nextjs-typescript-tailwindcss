import { Editor } from '@tiptap/react';

export const getFocusedEditor = (editor: Editor) => {
  return editor?.chain()?.focus();
};

export const validateUrl = (url: string) => {
  if (!url.trim()) return '';

  let finalUrl;

  try {
    finalUrl = new URL(url);
  } catch (e) {
    finalUrl = new URL('http://' + url);
  }

  return finalUrl.origin;
};
