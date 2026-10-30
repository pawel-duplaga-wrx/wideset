import type { HighlighterCore } from 'shiki/core';

export type CodeLang = 'tsx' | 'ts' | 'bash' | 'css' | 'json';

let highlighterPromise: Promise<HighlighterCore> | null = null;

/**
 * Fine-grained shiki: only the grammars this site prints and the JavaScript regex engine,
 * so the full bundle (every language shiki ships) never reaches the browser.
 */
const getHighlighter = () => {
  highlighterPromise ??= (async () => {
    const [{ createHighlighterCore }, { createJavaScriptRegexEngine }, ...langs] =
      await Promise.all([
        import('shiki/core'),
        import('shiki/engine/javascript'),
        import('shiki/langs/tsx.mjs'),
        import('shiki/langs/typescript.mjs'),
        import('shiki/langs/bash.mjs'),
        import('shiki/langs/css.mjs'),
        import('shiki/langs/json.mjs'),
      ]);
    return createHighlighterCore({
      themes: [import('shiki/themes/github-light.mjs'), import('shiki/themes/github-dark.mjs')],
      langs,
      engine: createJavaScriptRegexEngine({ forgiving: true }),
    });
  })();
  return highlighterPromise;
};

/** Both themes at once as CSS variables; docs.css switches on `.dark`. */
export const highlight = async (code: string, lang: CodeLang) => {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code.trimEnd(), {
    lang: lang === 'ts' ? 'typescript' : lang,
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  });
};
