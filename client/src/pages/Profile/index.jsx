import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../components/UserContext";

import "./index.scss";
import UserPost from "../../components/UserPost";
import UserQuestion from "../../components/UserQuestion";
const Profile = () => {
  const [post, setPost] = useState(true);
  const [question, setQuestion] = useState(false);
  const [data, setData] = useState({});
  const { user } = useUser();
  useEffect(() => {
    const fetch = async () => {
      if (user) {
        const response = await axios.get(`/users/${user._id}`);
        setData(response.data.data);
        console.log(data[0]?.questions);
      }
    };
    fetch();
  }, []);
  // console.log(data[0]?.posts);
  return (
    <div className="Profile">
      <div className="nav-profile">
        <ul>
          <li
            onClick={() => {
              setPost(!post);
              setQuestion(!question);
            }}
          >
            Posts
          </li>
          <li
            onClick={() => {
              setQuestion(!question);
              setPost(!post);
            }}
          >
            Question
          </li>
          <li>About Me</li>
        </ul>
      </div>
      <div>
        {post ? (
          <div className="post">
            <h1>Post Posted</h1>
            <UserPost data={data[0]?.posts} />
          </div>
        ) : null}
        {question ? (
          <div className="post">
            <h1>Questions Asked</h1>
            <UserQuestion data={data[0]?.questions} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
