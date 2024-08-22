import {
  ContextMenuItemType,
  ConversationTypeData,
  SettingsItemType,
  UserSidebarItemType,
} from './types';

export const chatTypes: ConversationTypeData[] = [
  {
    type: 'private',
    label: 'Private',
  },
  {
    type: 'group',
    label: 'Group',
  },
];

export const userContextMenuItems: ContextMenuItemType[] = [
  {
    label: 'Kick User',
    action: 'kick',
    color: '#ff0000',
    ownerOnly: true,
  },
  {
    label: 'Transfer Owner',
    action: 'transfer_owner',
    color: '#FFB800',
    ownerOnly: true,
  },
  {
    label: 'Profile',
    action: 'profile',
    color: '#7c7c7c',
    ownerOnly: false,
  },
];

export const friendsNavbarItems = [
  {
    id: 'friends',
    label: 'Friends',
    pathname: '/friends',
  },
  {
    id: 'requests',
    label: 'Requests',
    pathname: '/friends/requests',
  },
  {
    id: 'blocked',
    label: 'Blocked',
    pathname: '/friends/blocked',
  },
];

export const userSidebarItems: UserSidebarItemType[] = [
  {
    id: 'conversations',
    pathname: '/conversations',
  },
  {
    id: 'friends',
    pathname: '/friends',
  },
  // {
  //   id: 'connections',
  //   pathname: '/connections',
  // },
  {
    id: 'settings',
    pathname: '/settings',
  },
  {
    id: 'calls',
    pathname: '/calls',
  },
];

export const settingsItems: SettingsItemType[] = [
  {
    id: 'profile',
    label: 'Profile',
    pathname: '/settings/profile',
  },
  // {
  //   id: 'security',
  //   label: 'Security',
  //   pathname: '/settings/security',
  // },
  // {
  //   id: 'notifications',
  //   label: 'Notifications',
  //   pathname: '/settings/notifications',
  // },
  // {
  //   id: 'integrations',
  //   label: 'Integrations',
  //   pathname: '/settings/integrations',
  // },
  {
    id: 'appearance',
    label: 'Appearance',
    pathname: '/settings/appearance',
  },
];

export enum CDN_URL {
  BASE = 'https://pfmjuqeakbaetoofuspf.supabase.co/storage/v1/object/public/chat-platform-storage/',
  ORIGINAL = 'https://pfmjuqeakbaetoofuspf.supabase.co/storage/v1/object/public/chat-platform-storage/original/',
  PREVIEW = 'https://pfmjuqeakbaetoofuspf.supabase.co/storage/v1/object/public/chat-platform-storage/preview/',
}

export enum SenderEvents {
  VIDEO_CALL_INITIATE = 'onVideoCallInitiate',
  VIDEO_CALL_ACCEPT = 'onVideoCallAccepted',
  VOICE_CALL_INITIATE = 'onVoiceCallInitiate',
  VOICE_CALL_ACCEPT = 'onVoiceCallAccepted',
}

export enum ReceiverEvents {
  VOICE_CALL = 'onVoiceCall',
}

export enum WebsocketEvents {
  VOICE_CALL_ACCEPTED = 'onVoiceCallAccepted',
  VOICE_CALL_HANG_UP = 'onVoiceCallHangUp',
  VOICE_CALL_REJECTED = 'onVoiceCallRejected',
  VIDEO_CALL_REJECTED = 'onVideoCallRejected',
  VIDEO_CALL_HANG_UP = 'onVideoCallHangUp',
}
