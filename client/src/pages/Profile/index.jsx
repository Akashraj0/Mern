import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../components/UserContext";
import PostCard from "../../components/PostCard";
import QuestionCard from "../../components/QuestionCard";
const Profile = () => {
  const [data, setData] = useState({});
  const { user } = useUser();
  useEffect(() => {
    const fetch = async () => {
      if (user) {
        const response = await axios.get(`/users/${user._id}`);
        setData(response.data.data);
        console.log(data);
      }
    };
    fetch();
  }, []);
  console.log(data[0]?.posts);
  return (
    <div>
      <p style={{ color: "white" }}>{data[0]?.name}</p>
      <div>
        <PostCard data={data[0]?.posts} />
      </div>
      <div>{/* <QuestionCard data={data[0].questions} /> */}</div>
    </div>
  );
};

export default Profile;
