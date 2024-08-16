import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MessagePanel } from '../../components/messages/MessagePanel';
import { SocketContext } from '../../utils/context/SocketContext';
import { ConversationChannelPageStyle } from '../../utils/styles';
import { AppDispatch } from '../../store';
import { editMessage } from '../../store/messages/messageSlice';
import { fetchMessagesThunk } from '../../store/messages/messageThunk';

export const ConversationChannelPage = () => {
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  const [isTyping, setIsTyping] = useState(false);
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);

  useEffect(() => {
    const conversationId = parseInt(id!);
    dispatch(fetchMessagesThunk(conversationId));
  }, [id]);

  useEffect(() => {
    const conversationId = id!;
    socket.emit('onConversationJoin', { conversationId });

    // socket.on('userConversationJoin', () => {
    //   console.log('user join conversation');
    // });

    // socket.on('userConversationLeave', () => {
    //   console.log('user leave conversation');
    // });

    socket.on('onTypingStart', () => {
      setIsRecipientTyping(true);
    });

    socket.on('onTypingStop', () => {
      setIsRecipientTyping(false);
    });

    socket.on('onMessageUpdate', (message) => {
      dispatch(editMessage(message));
    });

    return () => {
      socket.emit('onConversationLeave', { conversationId });
      // socket.off('userConversationJoin');
      // socket.off('userConversationLeave');
      socket.off('onTypingStart');
      socket.off('onTypingStop');
      socket.off('onMessageUpdate');
    };
  }, [id]);

  const sendTypingStatus = () => {
    if (isTyping) {
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          socket.emit('onTypingStop', { conversationId: id });
          setIsTyping(false);
        }, 2000)
      );
    } else {
      setIsTyping(true);
      socket.emit('onTypingStart', { conversationId: id });
    }
  };

  return (
    <ConversationChannelPageStyle>
      <MessagePanel
        sendTypingStatus={sendTypingStatus}
        isRecipientTyping={isRecipientTyping}
      ></MessagePanel>
    </ConversationChannelPageStyle>
  );
};
