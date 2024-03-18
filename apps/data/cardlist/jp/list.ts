import type { OPTCGCardList } from '../../types.js';
import st01 from './556001.json';
import st02 from './556002.json';
import st03 from './556003.json';
import st04 from './556004.json';
import st05 from './556005.json';
import st06 from './556006.json';
import st07 from './556007.json';
import st08 from './556008.json';
import st09 from './556009.json';
import st10 from './556010.json';
import st11 from './556011.json';
import st12 from './556012.json';
import st13 from './556013.json';
import op01 from './556101.json';
import op02 from './556102.json';
import op03 from './556103.json';
import op04 from './556104.json';
import op05 from './556105.json';
import op06 from './556106.json';
import op07 from './556107.json';
import eb01 from './556201.json';
import family from './556701.json';
import limited from './556801.json';
import promos from './556901.json';

const cardList: OPTCGCardList = [
  ...st01,
  ...st02,
  ...st03,
  ...st04,
  ...st05,
  ...st06,
  ...st07,
  ...st08,
  ...st09,
  ...st10,
  ...st11,
  ...st12,
  ...st13,
  ...eb01,
  ...op01,
  ...op02,
  ...op03,
  ...op04,
  ...op05,
  ...op06,
  ...op07,
  ...family,
  ...limited,
  ...promos,
];

export default cardList;
