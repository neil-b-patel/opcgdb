import { type OPCardList, OPCardListSchema } from '@opcgdb/types';

import st01 from './550001.json';
import st02 from './550002.json';
import st03 from './550003.json';
import st04 from './550004.json';
import st05 from './550005.json';
import st06 from './550006.json';
import st07 from './550007.json';
import st08 from './550008.json';
import st09 from './550009.json';
import st10 from './550010.json';
import st11 from './550011.json';
import st12 from './550012.json';
import st13 from './550013.json';
import st14 from './550014.json';
import op01 from './550101.json';
import op02 from './550102.json';
import op03 from './550103.json';
import op04 from './550104.json';
import op05 from './550105.json';
import op06 from './550106.json';
import op07 from './550107.json';
import eb01 from './550201.json';
import family from './550701.json';
import limited from './550801.json';
import promos from './550901.json';

const cardList: OPCardList = OPCardListSchema.parse([
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
  ...st14,
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
]);

export default cardList;
