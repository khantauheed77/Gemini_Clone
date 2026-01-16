import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {
    const {onSent, recentpromt, showresult,loading, resultdata, setInput, input} = useContext(Context);
  return (
    <div className="main">
      <div className="nav">
        <p>gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showresult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <img src={assets.compass_icon} alt="" />
                <p>Make a creative story</p>
              </div>
              <div className="card">
                <img src={assets.bulb_icon} alt="" />
                <p>Explain quantum computing</p>
              </div>
              <div className="card">
                <img src={assets.message_icon} alt="" />
                <p>Got any creative ideas for a 10 year old's birthday?</p>
              </div>
              <div className="card">
                <img src={assets.code_icon} alt="" />
                <p>Write a python code for a snake game</p>
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentpromt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? <div className="loader"><hr/><hr/><hr/></div> : <p dangerouslySetInnerHTML={{__html:resultdata}}></p>}
             
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here" />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={()=>onSent()} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Gemini Clone may display inaccurate info, including about people, so double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
