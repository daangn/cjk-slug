import { test } from 'uvu';
import * as assert from 'uvu/assert';

import cjkSlug from '../src';

const cases: Array<[input: string, output: string]> = [
  ['당근마켓 - 대한민국 1등 동네 커뮤니티', '당근마켓-대한민국-1등-동네-커뮤니티'],
  ['PM/기획', 'pm-기획'],
  ['개발 (iOS / 안드로이드)', '개발-ios-안드로이드'],
  ['ホロライブプロダクション Hororaibu Purodakushon', 'ホロライブプロダクション-hororaibu-purodakushon'],
  ['------title------', 'title'],
];

for (const [input, output] of cases) {
  test(`cjkSlug(${input})`, () => {
    assert.is(cjkSlug(input), output);
  });
}

test.run();
