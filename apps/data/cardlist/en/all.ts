import limited from "./limitted.json";
import promos from "./promos.json";
import st from "./st.js";
import op from "./op.js";
import type { OPTCGCardList } from "./../../types.js";

const cardList: OPTCGCardList = [...limited, ...promos, ...st, ...op];

export default cardList;
