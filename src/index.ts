interface CjkSlug {
  (
    title: string,
    options?: {
      lowercase?: boolean,
    },
  ): string;
}

const cjkSlug: CjkSlug = (
  title,
  {
    lowercase = true,
  } = {},
) => {
  const slug = title
    // replace all whitespace to a dash
    .replace(/[\s_]+/g, '-')
    // replace non-allowed sequences to a dash
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
    .replace(/([^a-zA-Z\d\-\u3040-\u309f\u30a0-\u30ff\u3400-\u4dbf\u4e00-\u9faf\uac00-\ud7a3\uff00-\uff9f])/g, '-')
    // replace multiple dashes to a single dash
    .replace(/-+/g, '-')
    // remove leading dashes
    .replace(/^-(.*)/, '$1')
    // remove trailing dashes
    .replace(/(.*)-$/, '$1')

  return lowercase
    ? slug.toLowerCase()
    : slug;
};

export default cjkSlug;
