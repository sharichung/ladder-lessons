// scripts/games/gameRegistry.js

export const games = [
  {
    id: "phonics-match",
    name: "拼音配對",
    module: "phonics-match",
    entry: "renderPhonicsMatch",
    type: "single",
    access: "free",
    description: "將字母與圖片配對，建立音素認知"
  },
  {
    id: "spelling-builder",
    name: "拼字遊戲",
    module: "spelling-builder",
    entry: "renderSpellingBuilder",
    type: "single",
    access: "pro",
    description: "拖放字母拼出單字，練習拼音與拼寫"
  },
  {
    id: "bingo",
    name: "聲音賓果",
    module: "bingo",
    entry: "renderBingoGame",
    type: "group",
    access: "pro",
    description: "聽音選字，完成一列賓果（多人互動）"
  }
];
