import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../components/UserContext";

import "./index.scss";
// import QuestionCard from "../../components/QuestionCard";
import UserPost from "../../components/UserPost";
import UserQuestion from "../../components/UserQuestion";
const Profile = () => {
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
          <li>Posts</li>
          <li>Question</li>
          <li>About Me</li>
        </ul>
      </div>
      <div>
        <div className="post">
          <UserPost data={data[0]?.posts} />
        </div>
        <div className="post">
          <UserQuestion data={data[0]?.questions} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
