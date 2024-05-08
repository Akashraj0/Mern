import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";
const Home = () => {
  return (
    <div className="Home">
      <nav>
        <div className="logo">
          {/* <img src={Logo} style={{ width: "5%" }} /> */}
        </div>
        <div className="link">
          <ul>
            <li>Post</li>
            <li>Questions</li>
          </ul>
        </div>
        <div className="logout">
          <p>LogOut</p>
        </div>
      </nav>
      <div className="Container">
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
