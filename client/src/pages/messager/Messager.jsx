import "./messager.css";
import Topbar from "../../components/topbar/Topbar";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import SearchBar from "../../components/searchBar/SearchBar";

const sessionData = window.sessionStorage.getItem("user");
const sessionUser = JSON.parse(sessionData);

export default function Messager() {
  // useEffect(() => {
  //   try {
  //     const getFriendsList = async () => {
  //       console.log(user.id);
  //       const response = await axios.get(`/friend/${user.id}`);
  //       console.log(response);
  //       const friendsList = response.data.friends;
  //       console.log(friendsList);
  //       setFriends(friendsList);
  //     };
  //     getFriendsList();
  //   } catch (error) {
  //     throw error;
  //   }
  // }, []);

  return (
    <>
      <Topbar />
      <div className="messager">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <SearchBar />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
            </div>
            <div className="chatBoxBottom">
              <textarea
                placeholder="write something..."
                className="chatBoxMessageInput"
              ></textarea>
              <button className="chatSubmitButton">Send</button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}
