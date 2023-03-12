import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "./redux/features/commentSlice";
import { SocketContext } from "./Utils/Context";

const SocketClient = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("create_comment", (data: any) => {
      dispatch(createComment(data));
    });

    return () => {
      socket.off("create_comment");
    };
  }, [socket]);

  return <div></div>;
};

export default SocketClient;
