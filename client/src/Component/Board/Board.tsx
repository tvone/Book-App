import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Board.scss";
import { useDispatch, useSelector } from "react-redux";
import { createAuthor, getAuthors } from "../../redux/features/authorSlice";
import { getStorys } from "../../redux/features/storySlice";
import { IAuthor, IStory, IAuth } from "../../interface/interface";

import { RootState } from "../../redux/store";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { toast } from "react-toastify";
import { getComment } from "../../redux/features/commentSlice";
const Board = () => {
  const [user, setUser] = useState({
    name: "",
    age: "",
  });
  const [story, setStory] = useState({
    title: "",
    author: "",
  });
  const [callback, setCallBack] = useState(false);
  const dispatch = useDispatch();
  const authorData = useSelector((state: RootState) => state.authorSlice);
  const storyData = useSelector((state: RootState) => state.storySlice);
  const { authors } = authorData;
  const { storys } = storyData;

  useEffect(() => {
    const getAuthor = async () => {
      await axios
        .post("/api/author")
        .then((res) => {
          dispatch(getAuthors(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getAuthor();
    const getStory = async () => {
      await axios
        .post("/api/story")
        .then((res) => {
          dispatch(getStorys(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getStory();
  }, [callback]);

  const authData = useSelector((state: RootState) => state.userSlice);
  const { auth, isLogged, isAdmin } = authData;

  const handleChangeUser = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onUser = async () => {
    try {
      await axios
        .post(
          "/api/author/create",

          {
            name: user.name,
            age: user.age,
          },
          { headers: { Authorization: `${auth.accessToken}` } }
        )
        .then((res) => {
          setCallBack(!callback);
        });
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
  };

  const handleChangeStory = (e: any) => {
    setStory({ ...story, [e.target.name]: e.target.value });
  };
  const onStory = async () => {
    try {
      await axios
        .post(
          "/api/story/create",
          {
            title: story.title,
            author: story.author,
          },
          {
            headers: { Authorization: `${auth.accessToken}` },
          }
        )
        .then((res) => {
          setCallBack(!callback);
        });
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
  };

  let navigate = useNavigate();
  const handleNavigate = useCallback(
    (id: string) => navigate(`book/${id}`),
    [navigate]
  );

  // const [avatar, setAvatar] = useState<any>("");

  // const handleChange = (e: any) => {
  //   setAvatar(e.target.files[0]);
  // };

  // useEffect(() => {
  //   console.log("mounted");
  //   return () => {
  //     console.log("clean");
  //     URL.revokeObjectURL(avatar);
  //   };
  // });

  let [count, setCount] = useState(100);
  let timerId = useRef<any>();
  const preCount = useRef<any>();

  useEffect(() => {
    console.log("useEffect");
    preCount.current = count;
  }, [count]);

  const handleIncre = () => {
    timerId.current = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
  };

  const handleDecre = () => {
    clearInterval(timerId.current);
  };
  console.log(count, preCount);

  return (
    <div>
      <div className="container">
        <div className="container-wrapper">
          <div className="manager author">
            <div className="text-content text-center p-3 text-blue-400">
              <h2 className="text-3xl">Manager Author</h2>
              <div className="App">
                <h1>{count}</h1>
                <button onClick={handleIncre}>Start</button>
                <button onClick={handleDecre}>Stop</button>
              </div>
            </div>
            <div className="form">
              <div className="form_input pb-3">
                <label htmlFor="name">Name</label>
                <input
                  className="w-full border-2 border-green-400 p-1 "
                  type="text"
                  name="name"
                  placeholder="Name Author"
                  onChange={handleChangeUser}
                />
              </div>
              <div className="form_input pb-3">
                <label htmlFor="name">Age</label>
                <input
                  className="w-full border-2 border-green-400 p-1 "
                  type="text"
                  name="age"
                  placeholder="Age Author"
                  onChange={handleChangeUser}
                />
              </div>

              <button onClick={onUser} className="bg-white mb-3 p-1 rounded-md">
                Create Author
              </button>
            </div>
            <br />
            <div className="list">
              <table>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Stories</th>
                </tr>

                {authors.map((item: IAuthor) => {
                  return (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td className="text-center">{item.age}</td>
                      <td className="flex flex-wrap">
                        {item.stories.map((t: IStory, index) => {
                          return (
                            <td key={index} className="p-1">
                              <Link to={`/book/${t._id}`}>{t.title}</Link>
                            </td>
                          );
                        })}
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
          <div className="manager author">
            <div className="text-content text-center p-3 text-blue-400">
              <h2 className="text-3xl">Manager Story</h2>
              {/* <input onChange={handleChange} type="file" />
              <img
                src={avatar !== "" ? URL.createObjectURL(avatar) : ""}
                alt=""
              /> */}
            </div>
            <div className="form">
              <div className="form_input pb-3">
                <label htmlFor="name">Title</label>
                <input
                  onChange={handleChangeStory}
                  className="w-full border-2 border-green-400 p-1 "
                  type="text"
                  name="title"
                  placeholder="Title"
                />
              </div>
              <div>
                <label htmlFor="author">Author</label>
                <select
                  onChange={handleChangeStory}
                  name="author"
                  className="w-full mb-3 p-1"
                >
                  <option>Select Author</option>
                  {authors.map((item: IAuthor) => {
                    return (
                      <option value={item._id} key={item._id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button
                onClick={onStory}
                className="bg-white mb-3 p-1 rounded-md"
              >
                Create Story
              </button>
            </div>
            <br />
            <div className="list mt-1">
              <table>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Fans</th>
                </tr>

                {storys.map((item: IStory) => {
                  return (
                    <tr
                      onClick={() => handleNavigate(item._id)}
                      className="cursor-pointer"
                      key={item._id}
                    >
                      <td>{item.title}</td>
                      <td>{item.author?.name}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Board;
