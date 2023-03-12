import React, { useContext } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IComment, IStory } from "../../interface/interface";
import { toast } from "react-toastify";
import axios from "axios";
import io from "socket.io-client";
import { createAuthor, getAuthors } from "../../redux/features/authorSlice";
import { checkTokenExp } from "../../Utils/checkTokenExp";
import { getApi, postApi } from "../../Utils/fetchData";
import { SocketContext } from "../../Utils/Context";
import { getComment } from "../../redux/features/commentSlice";
import moment from "moment";
import { getStorys } from "../../redux/features/storySlice";
// const socket = io();

const List = () => {
  const socket = useContext(SocketContext);
  let params = useParams();
  const { bookId } = params;
  const dataBooks = useSelector((state: RootState) => state.storySlice);
  const userData = useSelector((state: RootState) => state.userSlice);
  const cmtData = useSelector((state: RootState) => state.commentSlice);
  const { auth } = userData;
  const { storys } = dataBooks;
  const [story, setStory] = useState<IStory>();

  const [showReply, setShowReply] = useState("false");

  useEffect(() => {
    if (bookId) {
      storys.forEach((item: IStory) => {
        if (item._id == bookId) {
          setStory(item);
          dispatch(getComment(item.comments));
        }
      });
    }
  }, [bookId, storys]);

  useEffect(() => {
    if (cmtData.data.length === 0) {
      const reloadPost = async () => {
        await getApi(`detail_story/${bookId}`).then((res) => {
          dispatch(getComment(res?.data.comments));
        });
      };
      reloadPost();
    }
  }, []);

  const [comment, setComment] = useState({
    post_id: bookId,
    content: "",
  });

  const handleChangeCmt = (e: any) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    console.log("join room " + bookId);
    socket.emit("joinRoom", bookId);

    return () => {
      console.log("out room " + bookId);
      socket.emit("outRoom", bookId);
    };
  }, []);

  const dispatch = useDispatch();

  const onSubmitCmt = async () => {
    const result = await checkTokenExp(auth.accessToken, dispatch);
    const access_token = result ? result : auth.accessToken;
    try {
      await postApi("comment", { ...comment }, access_token).then((res) => {
        // console.log(res?.data);
      });
    } catch (error: any) {
      error.response && toast.error(error.response.data.msg);
    }
  };
  return (
    <div>
      <div className="bg-gray-400 h-screen flex flex-col items-center">
        <div className="bg-yellow-300 w-3/5 h-screen">
          <div className="content">
            <div className="text-center">{story?.title}</div>
            <div className="text-center">{story?.author?.name}</div>
            <div className="text-center">{story?.author?.age}</div>
          </div>
          <div className="comment p-2">
            <h4>Comment</h4>
            <div className="form w-full flex">
              <input
                name="content"
                onChange={handleChangeCmt}
                type="text"
                className="w-full mr-2 p-2"
              />
              <button onClick={onSubmitCmt} className="bg-blue-500 p-2">
                Post
              </button>
            </div>
            <div className="main-content h-full">
              <div className="content-cmt mt-3 ">
                {cmtData.data.map((item: IComment, index) => {
                  return (
                    <div>
                      <div key={index} className="content p-2 bg-white">
                        <div className="name text-cyan-500 ml-1">
                          {item.user.name}
                        </div>
                        <p>{item.content}</p>
                        <div className="like flex">
                          <span className="material-icons-outlined text-base mr-2 cursor-pointer text-green-700">
                            favorite_border
                          </span>
                          <div className="reply_user cursor-pointer text-green-700">
                            Reply
                          </div>
                        </div>{" "}
                        <small>{moment(item.createdAt).fromNow()}</small>
                      </div>{" "}
                      <div className="w-full relative h-24 mb-1">
                        <input
                          className="w-full p-3 border-stone-600 border-2"
                          type="text"
                        />
                        <button className="absolute right-5 bottom-0 bg-cyan-500 p-2">
                          Reply
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
