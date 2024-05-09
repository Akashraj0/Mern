import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../components/UserContext";
import HomeNav from "../../components/HomeNav";
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
    <div>
      <HomeNav />
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
            <li>Setting</li>
          </ul>
        </div>
        <div className="nav-data">
          {post ? (
            <div>
              <h1 style={{ textAlign: "center" }}>Post Posted</h1>
              <div className="post">
                <UserPost data={data[0]?.posts} />
              </div>
            </div>
          ) : null}
          {question ? (
            <div>
              <h1 style={{ textAlign: "center" }}>Questions Asked</h1>
              <div className="post">
                <UserQuestion data={data[0]?.questions} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
