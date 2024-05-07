import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="Home">
      <Link to="/post">Post</Link>
      <Link to="/ques">Question</Link>
    </div>
  );
};

export default Home;
