import { useState, useEffect } from "react";
import axios from "axios";
import "./index.scss";
import QuestionCard from "../../components/QuestionCard";
import HomeNav from "../../components/HomeNav";
function QuestionForm() {
  const [postData, setPostData] = useState([]);
  const [data, setData] = useState({ question: "", title: "", image: null });
  useEffect(() => {
    const getData = async () => {
      const result = await axios.get("/question/");
      setPostData(result.data);
    };
    getData();
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { question, image, title } = data;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("question", question);
      formData.append("image", image);
      console.log(title, question);

      const result = await axios.post("/question/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(result.data);
      console.log(result.data);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="post-Container">
      <HomeNav />
      <div className="form-container">
        <form
          className="post-form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            type="text"
            name="post-text"
            placeholder="Write Title..."
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <input
            type="text"
            name="post-text"
            placeholder="Write something..."
            value={data.question}
            onChange={(e) => setData({ ...data, question: e.target.value })}
          />
          <input
            type="file"
            name="post-image"
            accept="image/*"
            onChange={(e) => setData({ ...data, image: e.target.files[0] })}
          />
          <button type="submit">Post</button>
        </form>
      </div>
      <div className="post">
        <QuestionCard data={postData} />
      </div>
    </div>
  );
}

export default QuestionForm;
