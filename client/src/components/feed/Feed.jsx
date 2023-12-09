import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Feed({ userId }) {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (userId) {
        const res = await axios.get(`/post/${userId}`);
        const data = res.data.posts;
        if (data) {
          setFeed(data);
        }
      } else {
        const res = await axios.get("/feed");
        const data = res.data.feed;
        setFeed(data);
      }
    };
    fetchPosts();
  }, [feed]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {!userId ? <Share /> : ""}
        {feed.length > 0 &&
          feed.map((post) => <Post key={post.id} post={post} />)}
      </div>
    </div>
  );
}
