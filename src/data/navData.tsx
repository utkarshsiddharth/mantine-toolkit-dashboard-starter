/* eslint-disable prettier/prettier */
import {
  IconAdjustments,
  IconCurrencyRupee,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconNotes,
  IconPresentationAnalytics,
  IconUser
} from '@tabler/icons'

import type { NavLinkType } from '@/types/component.types'

export const navData: NavLinkType[] = [
  { label: 'Dashboard', icon: IconGauge, link: '/dashboard' },
  { label: 'Users', icon: IconUser, link: '/users' },
  {
    label: 'Product',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Analytics', link: '/product/analytics' },
      { label: 'Forecasts', link: '/' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/' }
    ]
  },
  { label: 'Analytics', icon: IconPresentationAnalytics, link: '/analytics' },
  { label: 'Orders', icon: IconFileAnalytics, link: '/orders' },
  { label: 'Payments', icon: IconCurrencyRupee, link: '/payments' },
  { label: 'Settings', icon: IconAdjustments, link: '/settings' },
  {
    label: 'Security',
    icon: IconLock,
    links: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' }
    ]
  }
]
