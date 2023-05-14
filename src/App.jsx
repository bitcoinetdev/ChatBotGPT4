import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organiztion: "org-zIMaUdofD7jKw9x793L2YyVt",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();

    setIsTyping(true);

    let msgs = chats   
    msgs.push ({ role: "user", content: message });
    setChats(msgs);
    setMessage("");

    await openai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are EbereGPT. You help with bitcoin and other cryptocurrencies.",
          },
          ...chats,
        ],
      })
      .then((result) => {
        msgs.push(result.data.choices[0].message);
        setChats(msgs);
        setIsTyping(false);
      })
      .catch(error => console.log(error));
  };

  return (
    <main>
      <h1>ChatBot CryptoABS</h1>

      <section>
      {
         chats && chats.length ? (
          chats.map((chat, index) => (
              <p key={index} className={chat.role === "user"? "user_msg":""}> 
                  <span>{chat.role}</span>
                <span>:</span>
                <span>{chat.content}</span>
              </p>
            ))
          ): ""
        }
      </section>

      
        <div className={isTyping ? "" : "hide"}>
          <p>
            <i>Typing</i>
          </p>
         </div> 
      

      <form onSubmit={(e) => chat(e, message)}>
        <input 
          type="text"
          name='message'
          value={message}
          placeholder="Type a message and hit enter"
          onChange={(e) => setMessage(e.target.value)} />
      </form>

    </main>
  );
}
export default App; 