import { useEffect, useReducer, useState } from "react";
import { sendResponse } from "./api";
import noSong from "./music/sad.mp3";
import yesSong from "./music/Happy.mp3";
const initialState = {
  question: "Would you like to go on a date with me?",
  input: false,
  openChat: false,
  agreed: false,
  disagree: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...action.payload };
    case "RESTORE_STATE":
      return initialState;
    default:
      return state;
  }
};

const setState = (state) => ({ type: "SET_STATE", payload: state });
const restoreState = () => ({ type: "RESTORE_STATE" });
const happyImage =
  "https://media3.giphy.com/media/pzvUqVbphlAPvrPrlu/200w.webp?cid=ecf05e47o3g6gltcl0qr8wwhcz12fev2bgq9tdd95pkkb91w&ep=v1_stickers_search&rid=200w.webp&ct=s";
const sadImage =
  "https://media2.giphy.com/media/3oKIPdF5sBePN9DYFG/giphy.webp?cid=ecf05e47vuxkhpy4mwmv62fks4dibk6u7za48rs7mo0vwn1i&ep=v1_stickers_search&rid=giphy.webp&ct=s";
const defaultImage =
  "https://media3.giphy.com/media/QZnShCmz0a1NZ1qUHl/giphy.webp?cid=ecf05e47nxhzwn7wjivy5ixq937u1ord4j2cd53l31pi441h&ep=v1_stickers_search&rid=giphy.webp&ct=s";
const NewApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { question, input, openChat, agreed, disagree } = state;
  const [messages, setMessages] = useState([]);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    dispatch(
      setState({
        input: e.target.value,
      })
    );
  };
  const handleYes = async () => {
    setAudio(new Audio(yesSong));
    dispatch(
      setState({
        question:
          "Great! Let's plan a date! My ideal date is going to the beach and drinking wine. What's yours? Answer in the textbox below.",
        input: "",
        openChat: true,
        agreed: true,
      })
    );
    await sendResponse("Awesome she said she will go out with you!");
  };
  const handleNo = async () => {
    setAudio(new Audio(noSong));
    dispatch(
      setState({
        question:
          "Oh well! It's all good, I'm not sad at all. Homer is just overreacting!",
        input: "",
        openChat: false,
        disagree: true,
      })
    );
   // await sendResponse("She said no! Better luck next time");
  };
  useEffect(() => {
    // if (audio && !audio.paused) {
    //   audio.pause();
    //   audio.currentTime = 0; // Reset the audio to the beginning
    // }
    // Play the background music when openChat becomes true
    if (audio) {
      audio.play();
    } else if (audio) {
      // Pause the background music when openChat becomes false
      audio.pause();
      audio.currentTime = 0; // Reset the audio to the beginning
    }
  }, [input, audio]);
  return (
    <div className="flex text-white flex-col relative h-screen bg-gray-900">
      <div className="flex flex-col items-center justify-center h-screen">
        {/* Question element */}
        <h1 className="text-4xl font-bold text-center">{question}</h1>
        <div>
          <img
            className="w-72 h-64 mt-4"
            src={disagree ? sadImage : defaultImage}
            alt="hope joey"
          />
        </div>
        {/* Buttons container */}
        {!agreed && (
          <div className="flex mt-4 space-x-4">
            {/* Yes button */}
            <button
              onClick={handleYes}
              className="px-6 py-4 font-bold text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
            >
              Yes
            </button>

            <button
              onClick={handleNo}
              className="px-6 py-4 font-bold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
            >
              No
            </button>
          </div>
        )}
        {agreed && (
          <img className="w-64 h-64 mt-4" src={happyImage} alt="homer happy" />
        )}
      </div>
      {openChat && (
        <div className="animate-topslide absolute w-[300px] right-2 bottom-2 bg-gray-800 min-h-[350px]">
          <p
            onClick={() => dispatch(restoreState())}
            className="mr-auto hover:text-gray-400 text-[15px] py-2 w-full flex justify-end px-2 text-white hover:underline cursor-pointer"
          >
            x
          </p>
          <div className="flex-1 p-4  overflow-y-auto mb-[70px] max-h-[400px]">
            {/* Map over the messages array and render each message */}
            <p className="text-center">Please describe your ideal date</p>
            {messages.map((message, index) =>
              message.type === "bot" ? (
                <div key={index} className="p-1 m-2 rounded bg-gray-900">
                  <p className="text-[10px] p-2">BOT</p>
                  {message.text}
                </div>
              ) : (
                <div key={index} className="p-1 m-2 rounded bg-blue-600">
                  <p className="text-[10px] p-2">ME</p>
                  {message.text}
                </div>
              )
            )}
          </div>
          <div>
            {/* Input field for typing messages */}
            <form className="flex p-4 bg-white absolute bottom-0 border-t border-gray-300">
              <input
                type="text"
                value={input}
                onChange={handleChange}
                className="flex-1 p-2 mr-2 text-gray-700 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Type your message here..."
              />
              {/* Button for sending messages */}
              <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
                {loading ? (
                  <span className="animate-pulse text-sm">...</span>
                ) : (
                  "Send"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewApp;
