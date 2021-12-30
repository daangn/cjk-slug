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
    // strip half-width quotation marks
    // - 0022: quotation mark (")
    // - 0027: apostrophe (')
    // - 02bc: modifier letter apostrophe
    // - 0060: grave accent
    // - 00b4: acute accent
    // - 2018: left single quotation mark
    // - 2019: right single quotation mark
    // - 201c: left double quotation mark
    // - 201d: right double quotation mark
    .replace(/[\u0022\u0027\u02bc\u0060\u00b4\u2018\u2019\u201c\u201d]/g, '')
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
