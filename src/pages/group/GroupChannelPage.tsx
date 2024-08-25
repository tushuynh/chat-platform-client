import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MessagePanel } from '../../components/messages/MessagePanel';
import { SocketContext } from '../../utils/context/SocketContext';
import { ConversationChannelPageStyle } from '../../utils/styles';
import { AppDispatch, RootState } from '../../store';
import {
  editGroupMessage,
  fetchGroupMessagesThunk,
} from '../../store/groupMessageSlice';
import { GroupMessageType, User } from '../../utils/types';
import { GroupRecipientsSidebar } from '../../components/sidebars/group-recipients/GroupRecipientsSidebar';
import { EditGroupModal } from '../../components/modals/EditGroupModal';

export const GroupChannelPage = () => {
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  const [isTyping, setIsTyping] = useState(false);
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);
  const [userTypings, setUserTypings] = useState<string[]>([]);

  const { showEditGroupModal } = useSelector(
    (state: RootState) => state.groups
  );
  const showSidebar = useSelector(
    (state: RootState) => state.groupSidebar.showSidebar
  );

  useEffect(() => {
    const groupId = parseInt(id!);
    dispatch(fetchGroupMessagesThunk(groupId));
  }, [id]);

  useEffect(() => {
    const groupId = id!;

    socket.emit('onGroupJoin', { groupId });

    socket.on('onGroupTypingStart', (user: User) => {
      setUserTypings((prevUsers) => [...prevUsers, user.firstName]);
      console.log(`typing: `, userTypings);
      setIsRecipientTyping(true);
    });

    socket.on('onGroupTypingStop', (user: User) => {
      setUserTypings((prevUsers) =>
        prevUsers.filter((item) => item !== user.firstName)
      );

      setIsRecipientTyping(false);
    });

    socket.on('onGroupMessageUpdate', (message: GroupMessageType) => {
      dispatch(editGroupMessage(message));
    });

    return () => {
      socket.emit('onGroupLeave', { groupId });
      socket.off('onGroupTypingStart');
      socket.off('onGroupTypingStop');
      socket.off('onGroupMessageUpdate');
    };
  }, [id]);

  const sendTypingStatus = () => {
    if (isTyping) {
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          socket.emit('onGroupTypingStop', { groupId: id });
          setIsTyping(false);
        }, 2000)
      );
    } else {
      setIsTyping(true);
      socket.emit('onGroupTypingStart', { groupId: id });
    }
  };

  return (
    <>
      {showEditGroupModal && <EditGroupModal />}
      <ConversationChannelPageStyle>
        <MessagePanel
          sendTypingStatus={sendTypingStatus}
          isRecipientTyping={isRecipientTyping}
          userTypings={userTypings}
        ></MessagePanel>
      </ConversationChannelPageStyle>
      {showSidebar && <GroupRecipientsSidebar />}
    </>
  );
};
