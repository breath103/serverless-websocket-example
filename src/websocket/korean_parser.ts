const startChars = [
  "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ",
  "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
];
const middleChars = [
  "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ",
  "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"
];
const endChars = [
  "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ",
  "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ",
  "ㅍ", "ㅎ"
];

import * as _ from "lodash";

export function decompose(korean: string) {
  return _.map(korean, (char) => {
    // - korean unicode base key
    const charCode = char.charCodeAt(0) - 0xAC00;
    const end = charCode % 28; // 종성
    const middle = ((charCode - end) / 28 ) % 21; // 중성
    const start = (((charCode - end) / 28 ) - middle ) / 21; // 초성
    return {
      start: startChars[start],
      middle: middleChars[middle],
      end: endChars[end],
    };
  });
}
