import { keyframes, styled } from '@stitches/react';
import themes from '../../styles/sticthes.config';

const { colors } = themes.theme;

export const Container = styled('div', {
  display: 'flex',
});

export const Sidebar = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: 300,
  height: '100vh',
  borderRight: `1px ${colors.gray} solid`,
  background: colors.dark200,
  // background: '#16191c',
});

export const SidebarTopSection = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  gap: 10,
  width: '100%',
  height: 64,
});
export const SidebarTopSectionIcons = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  gap: 10,
  width: '100%',
  height: 64,
});

export const SidebarSearch = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '12px 16px 24px',
  gap: '10px',
  width: '100%',
  height: '76px',
});

export const SidebarDevider = styled('div', {
  width: '100%',
  borderBottom: `1px solid ${colors.purple400}`,
});

export const SidebarTitleContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  padding: '12px 24px',
  gap: '10px',
  width: '100%',
  height: '56px',
});

export const SidebarTitle = styled('h5', {
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 18,
  lineHeight: '32px',
  color: colors.light100,
});

export const SidebarChat = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  height: '620px',
  // background: colors.dark300,
  overflowY: 'scroll',
  userSelect: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

export const SidebarChatUser = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '12px 24px',
  gap: '14px',
  width: '100%',
  height: '72px',
  background: colors.dark300,
  cursor: 'context-menu',
});

export const SidebarChatContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

export const SidebarChatContentTitle = styled('h3', {
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '24px',
  textTransform: 'capitalize',
  color: colors.light100,
});

export const SidebarChatContentText = styled('div', {
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '20px',
  color: 'rgba(255, 255, 255, 0.6)',
  width: '216px',
  overflowX: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

export const ChatArea = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginInline: 300,
  marginTop: '60px',
  marginBottom: '60px',
  width: '100%',
  overflow: 'hidden',
});

export const ChatAreaHeader = styled('div', {
  position: 'fixed',
  top: '0',
  zIndex: '2',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 24px',
  gap: '10px',
  background: colors.dark200,
  borderBottom: `1px solid ${colors.gray}`,
  width: '100%',
});

export const ChatAreaHeaderUser = styled('div', {
  fontWeight: '600',
  textTransform: 'capitalize',
  fontSize: 14,
  lineHeight: '24px',
  color: colors.light100,
});

export const ChatAreaHeaderIcons = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: '16px',
});

export const ChatAreaSection = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '24px',
  gap: '16px',
  background: colors.dark300,
  width: '100%',
});

export const ChatAreaSectionRightchat = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '40px',
});

const ChatBubbleAnim = keyframes({
  '0%': {
    opacity: 0,
    transform: 'rotateX(100deg)',
    transformOrigin: 'bottom',
  },
  '100%': {
    opacity: 1,
    transform: 'rotateX(0)',
    transformOrigin: 'bottom',
  },
});

export const ChatAreaSectionRightchatChatbubble = styled('div', {
  display: 'flex',
  padding: 14,
  gap: '10px',
  background: colors.gray100,
  borderRadius: '0px 16px 16px 16px',
  maxWidth: '532px',
  alignSelf: 'start',
  animation: `${ChatBubbleAnim} 400ms ease 0s 1 normal forwards`,
});

export const ChatAreaSectionLeftchatChatbubble = styled('div', {
  display: 'flex',
  padding: 14,
  gap: '10px',
  background: colors.purple300,
  borderRadius: '16px 0 16px 16px',
  maxWidth: '532px',
  alignSelf: 'end',
  animation: `${ChatBubbleAnim} 400ms ease 0s 1 normal forwards`,
});

export const ChatAreaSectionRightchatTexts = styled('p', {
  fontWeight: '400',
  fontSize: 14,
  lineHeight: '20px',
  color: colors.light100,
});

export const ChatAreaSectionLeftchatTexts = styled('p', {
  fontWeight: '400',
  fontSize: 14,
  lineHeight: '20px',
  color: colors.light100,
});

export const MessageBar = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 24px',
  position: 'fixed',
  gap: '10px',
  width: '100vw',
  bottom: '0',
  height: '64px',
  background: '#1c1d22',
  borderTop: `1px solid ${colors.purple400}`,
});
export const SendButtonContainer = styled('div');

const ChatDetailAnim = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateX(250px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateX(0)',
  },
});

export const ChatDetails = styled('div', {
  position: 'fixed',
  top: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: 300,
  borderLeft: `1px solid ${colors.gray}`,
  zIndex: 2,
  height: '100vh',
  background: '#1c1d22',
  transition: 'ease-out 0.2s all',
  animation: `${ChatDetailAnim} 400ms ease 0s 1 normal forwards`,
});

export const ChatDetailsHeader = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  padding: 24,
  gap: 8,
  borderBottom: `1px solid ${colors.gray}`,
  width: '100%',
});

export const ChatDetailsHeaderTitle = styled('span', {
  fontWeight: 600,
  fontSize: 16,
  lineHeight: 24,
  color: colors.light100,
});

export const ProfileContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: '24px',
  gap: '16px',
});

export const ProfileDescription = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const Status = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '14px 34px',
  gap: '8px',
  borderTop: `1px solid ${colors.purple400}`,
  borderBottom: `1px solid ${colors.purple400}`,
  width: '100%',
});

export const StatusTitle = styled('span', {
  fontWeight: 600,
  fontSize: 14,
  textTransform: 'capitalize',
  lineHeight: '24px',
  color: colors.light100,
});

export const StatusDescription = styled('div', {
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '20px',
  color: 'rgba(255, 255, 255, 0.6)',
});

export const FunctionSection = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '24px',
  gap: '24px',
});

export const FunctionSectionButton = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 12px',
  gap: '8px',
  width: '232px',
  height: '36px',
  background: colors.gray100,
  borderRadius: '4px',
});

export const Info = styled('span', {
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '20px',
  color: colors.light100,
});
