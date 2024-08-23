import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { resetState } from '../../../store/call/callSlice';
import { SocketContext } from '../../context/SocketContext';
import { WebsocketEvents } from '../../constants';

export function useVideoCallHangUp() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const { call, connection, localStream, remoteStream } = useSelector(
    (state: RootState) => state.call
  );
  useEffect(() => {
    socket.on(WebsocketEvents.VIDEO_CALL_HANG_UP, () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
        
      if (remoteStream) {
        remoteStream.getTracks().forEach((track) => {
          track.stop();
        });
      }

      call && call.close();
      connection && connection.close();
      dispatch(resetState());
    });

    return () => {
      socket.off(WebsocketEvents.VIDEO_CALL_HANG_UP);
    };
  }, [call, remoteStream, localStream]);
}
