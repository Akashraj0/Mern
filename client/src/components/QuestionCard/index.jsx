import { useState } from "react";
import PropTypes from "prop-types";
import AnswerCard from "../AnswerCard";

const QuestionCard = ({ data }) => {
  // console.log(data);
  const [expandedPostIndex, setExpandedPostIndex] = useState(null);

  const togglePostExpansion = (index) => {
    if (index === expandedPostIndex) {
      setExpandedPostIndex(null);
    } else {
      setExpandedPostIndex(index);
    }
  };

  return (
    <div>
      {Array.isArray(data?.data) || Array.isArray(data) ? (
        data?.data?.map((item, i) => (
          <div key={i} className="post-grid">
            <div className="post-title" style={{ color: "black" }}>
              {item.title}
            </div>
            <div className="post-meta">
              {`Author: ${item.user.name} | Date Posted: ${new Date(
                item.date
              ).toDateString()}`}
            </div>
            <div className="post-content">
              <p
                onClick={() => togglePostExpansion(i)}
                className={expandedPostIndex === i ? "expanded" : ""}
              >
                {expandedPostIndex === i
                  ? item.question
                  : item.question.length > 50
                  ? `${item.question.substring(0, 50)} (read more...)`
                  : item.question}
              </p>
              <img
                className="post-image"
                src={item.image}
                alt="Image Description"
              />
            </div>
            <AnswerCard item={item} index={i} />
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

QuestionCard.propTypes = {
  data: PropTypes.array.isRequired,
};

export default QuestionCard;
