import { normalize as normalizeCjk } from 'normalize-cjk';

interface CjkSlug {
  (
    title: string,
    options?: {
      lowercase?: boolean,
      normalize?: (input: string) => string,
    },
  ): string;
}

const cjkSlug: CjkSlug = (
  title,
  {
    lowercase = true,
    normalize = normalizeCjk,
  } = {},
) => {
  let slug = normalize(title)
    // replace all whitespaces with a dash
    .replace(/[\s_]+/g, '-')
    // replace non-allowed sequences with a dash
    // allowed sequences:
    // - Alphanumeric
    // - Dash
    // - SEO-friendly CJK character sequences
    //   3040 - 309f: Hiragana
    //   30a0 - 30ff: Katakana
    //   3400 - 4dbf: CJK unified ideographs Extension A - Rare Kanji
    //   4e00 - 9faf: CJK unified ideographs - Common and uncommon Kanji
    //   ac00 - d7a3: Korean completed words (가-힣)
    //   ff00 - ff9f: Full-width Roman characters and half-width Katakana
    .replace(/[^a-z\d\-\u3040-\u309f\u30a0-\u30ff\u3400-\u4dbf\u4e00-\u9faf\uac00-\ud7a3\uff00-\uff9f]/gi, '-')
    // replace multiple dashes with a single dash
    .replace(/-+/g, '-')
    // remove leading / trailing dashes
    .replace(/^-|-$/g, '');

  if (lowercase) {
    slug = slug.toLowerCase();
  }

  return slug;
};

export default cjkSlug;
