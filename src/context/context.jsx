import { createContext, useState } from "react";
import main from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentpromt, setRecentpromt] = useState("");
  const [prevpromt, setPrevprompt] = useState([]);
  const [showresult, setShowresult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultdata, setResultdata] = useState("");

  // FORMAT AI RESPONSE (Markdown → HTML)
  const formatResponse = (text) => {
    if (!text) return "";

    // Headings
    text = text.replace(/^### (.*$)/gim, "<h3>$1</h3>");
    text = text.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    text = text.replace(/^# (.*$)/gim, "<h1>$1</h1>");

    // Bold
    text = text.replace(/\*\*(.*?)\*\*/gim, "<b>$1</b>");

    // Italic
    text = text.replace(/\*(.*?)\*/gim, "<i>$1</i>");

    // Line breaks
    text = text.replace(/\n/g, "<br/>");

    return text.trim();
  };

  // Typing animation for AI reply
  const typeText = (formattedText) => {
    const words = formattedText.split(" ");
    setResultdata("");

    words.forEach((word, index) => {
      setTimeout(() => {
        setResultdata((prev) => prev + word + " ");
      }, 40 * index);
    });
  };

  const onSent = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setShowresult(true);
    setResultdata("");

    const prompt = input.trim();
    setRecentpromt(prompt);

    // Call Gemini
    const response = await main(prompt);

    if (!response) {
      setResultdata("Sorry, no response received.");
      setLoading(false);
      return;
    }

    // -----------------------------------
    // Format the Gemini output properly
    // -----------------------------------
    const formatted = formatResponse(response);

    // Typing effect
    typeText(formatted);

    setLoading(false);
    setInput("");
  };

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
