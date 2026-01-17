import { createContext, useState } from "react";
import main from '../config/gemini';

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentpromt, setRecentpromt] = useState("");
  const [prevpromt, setPrevprompt] = useState([]);
  const [showresult, setShowresult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultdata, setResultdata] = useState("");

  const delaypara = (index, nextWord) => {
    setTimeout(() => {
      setResultdata(prev => prev + nextWord)
    }, 75 * index)
  }

  const onSent = async (prompt) => {
    setResultdata('')
    setLoading(true)
    setShowresult(true)
    setRecentpromt(input)
    
    try {
      // Use API route in production, direct call in development
      let response;
      if (import.meta.env.PROD) {
        const apiRes = await fetch("/api/gemini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: input }),
        });
        const data = await apiRes.json();
        if (!apiRes.ok) {
          throw new Error(data.error || 'API request failed');
        }
        response = data.output;
      } else {
        response = await main(input);
      }
      
      if(!response){
        setResultdata('Sorry, no response received.')
        setLoading(false)
        return;
      }
      
      let responseArray = response.split('**');
      let newresponse = '';
      for(let i=0 ; i < responseArray.length ; i++){
        if(i % 2 === 0){ 
          newresponse += responseArray[i]
        }else{
          newresponse += "<b>"+responseArray[i]+"</b>"
        }
      }
      let newresponse2 = newresponse.split('*').join('<br>').replace(/###\s*/g, '<br><h3>').replace(/##\s*/g, '<br><h2>');
      let newResponseArray = newresponse2.split(' ');
      for(let i=0; i < newResponseArray.length; i++){
        const nextWord = newResponseArray[i];
        delaypara(i, nextWord + ' ')
      }
    } catch (error) {
      console.error('Error:', error);
      setResultdata('Sorry, there was an error processing your request.');
    }
    
    setLoading(false)
    setInput('')
  }

  const contextValue = {
    prevpromt,
    setPrevprompt,
    input,
    setInput,
    recentpromt,
    setRecentpromt,
    showresult,
    setShowresult,
    loading,
    setLoading,
    resultdata,
    setResultdata,
    onSent,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
