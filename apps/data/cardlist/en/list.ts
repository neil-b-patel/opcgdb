import { type OPCardList, OPCardListSchema } from '@opcgdb/types';

import st01 from './569001.json';
import st02 from './569002.json';
import st03 from './569003.json';
import st04 from './569004.json';
import st05 from './569005.json';
import st06 from './569006.json';
import st07 from './569007.json';
import st08 from './569008.json';
import st09 from './569009.json';
import st10 from './569010.json';
import st11 from './569011.json';
import st12 from './569012.json';
import st13 from './569013.json';
import op01 from './569101.json';
import op02 from './569102.json';
import op03 from './569103.json';
import op04 from './569104.json';
import op05 from './569105.json';
import op06 from './569106.json';
import eb01 from './569201.json';
import limited from './569801.json';
import promos from './569901.json';

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
  ...op01,
  ...op02,
  ...op03,
  ...op04,
  ...op05,
  ...op06,
  ...eb01,
  ...limited,
  ...promos,
]);

export default cardList;
