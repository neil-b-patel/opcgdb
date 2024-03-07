import op1 from "./op-01.json";
import op2 from "./op-02.json";
import op3 from "./op-03.json";
import op4 from "./op-04.json";
import op5 from "./op-05.json";
import op6 from "./op-06.json";

import type { OPTCGCardList } from "./../../types.js";

const cardList: OPTCGCardList = [
  ...op1,
  ...op2,
  ...op3,
  ...op4,
  ...op5,
  ...op6,
];

export default cardList;
