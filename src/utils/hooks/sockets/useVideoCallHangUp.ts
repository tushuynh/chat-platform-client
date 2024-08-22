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
      console.log('local stream: ', localStream?.id)
      if (localStream) {
        console.log('stopping local stream...')
        localStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
        
      console.log('remote stream: ', remoteStream?.id)
      if (remoteStream) {
        console.log('stopping remote stream')
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
