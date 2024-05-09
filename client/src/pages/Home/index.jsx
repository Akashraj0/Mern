import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import HomeNav from "../../components/HomeNav";
import "./index.scss";
const Home = () => {
  return (
    <div className="Home">
      <HomeNav />
      <div className="Container">
        <h1>
          Ready to make your mark? Share your insights, experiences, and
          questions! Join our community and start writing your post today. Your
          voice matters, your ideas are valuable. Let&#39;s inspire, connect,
          and learn from each other. Don&#39;t wait any longer—start writing
          now!
        </h1>
        <div className="feature">
          <h2>Forum Posts</h2>
          <p>
            Share your insights, experiences, and ideas with the community by
            creating forum posts. Connect with others and contribute to
            discussions on various topics.
          </p>
          <a href="/post" className="btn primary">
            Start Posting <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
        <div className="feature">
          <h2>Questions</h2>
          <p>
            Have a burning question? Ask the community and get answers from
            experts and peers. Benefit from collective knowledge and find
            solutions to your queries.
          </p>
          <a href="/question" className="btn secondary">
            Ask a Question <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
