import { CiMedal } from 'react-icons/ci';
import { IoPersonOutline } from 'react-icons/io5';
import { TiHomeOutline } from 'react-icons/ti';

import MoneyBag from '@/components/SVGs/MoneyBag';

export const menuItems = [
  {
    name: 'home',
    path: '/',
    icon: <TiHomeOutline />,
  },
  {
    name: 'leader-board',
    icon: <CiMedal />,
  },
  {
    name: 'payment',
    icon: <MoneyBag />,
  },
  {
    name: 'profile',
    icon: <IoPersonOutline />,
  },
] as const;
