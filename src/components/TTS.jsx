import React, { useEffect, useState } from "react";
import { FiVolume2 } from "react-icons/fi";
import { speechConfig } from "../i18n";
import "./TTS.css";

const TTS = ({ language, unsupportedMessage }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState(null);
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return undefined;
    }

    const updateVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    updateVoices();
    window.speechSynthesis.addEventListener("voiceschanged", updateVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", updateVoices);
    };
  }, []);

  useEffect(() => {
    const handleSelectionChange = () => {
      if (typeof window === "undefined") return;

      const selection = window.getSelection();
      if (!selection) {
        setVisible(false);
        return;
      }

      const selectedText = selection.toString().trim();
      if (!selectedText) {
        setVisible(false);
        return;
      }

      try {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        if (
          !rect ||
          (rect.top === 0 &&
            rect.left === 0 &&
            !rect.width &&
            !rect.height)
        ) {
          setVisible(false);
          return;
        }

        const navbarHeight = 80;
        const isNearTop = rect.top < navbarHeight + 10;

        const top = isNearTop
          ? rect.bottom + window.scrollY + 10
          : rect.top + window.scrollY - 35;

        const left = rect.left + window.scrollX;

        setText(selectedText);
        setPosition({ top, left });
        setVisible(true);
      } catch {
        setVisible(false);
      }
    };

    const handleMouseUp = () => handleSelectionChange();
    const handleKeyUp = () => handleSelectionChange();

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const getMatchingVoice = () => {
    const config = speechConfig[language] || speechConfig.en;
    return voices.find((voice) =>
      config.voicePrefixes.some((prefix) => voice.lang.toLowerCase().startsWith(prefix.toLowerCase())),
    );
  };

  const handleSpeak = () => {
    if (!text) return;

    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert(unsupportedMessage);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const config = speechConfig[language] || speechConfig.en;
    const matchingVoice = getMatchingVoice();

    utterance.lang = config.lang;
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);

    setVisible(false);
  };

  if (!visible || !position) return null;

  return (
    <div
      className="tts-popup"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <button
        type="button"
        onClick={handleSpeak}
        className="tts-button"
      >
        <FiVolume2 className="tts-icon" />
      </button>
    </div>
  );
};

export default TTS;
