import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store';
import { resetState } from '../../../../store/call/callSlice';
import { WebsocketEvents } from '../../../constants';
import { SocketContext } from '../../../context/SocketContext';

export function useVoiceCallRejected() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    socket.on(WebsocketEvents.VOICE_CALL_REJECTED, (data) => {
      dispatch(resetState());
    });

    return () => {
      socket.off(WebsocketEvents.VOICE_CALL_REJECTED);
    };
  }, []);
}
