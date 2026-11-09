"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Bot,
  MessageCircle,
  Mic,
  Send,
  Volume2,
  X,
} from "lucide-react";
import { useAppPreferences } from "@/components/app-shell";

type SpeechResult = {
  readonly 0: { readonly transcript: string };
};

type SpeechResultEvent = Event & {
  readonly results: ArrayLike<SpeechResult>;
};

type SpeechErrorEvent = Event & {
  readonly error: string;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onerror: ((event: SpeechErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  abort: () => void;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

type Message = {
  id: number;
  author: "assistant" | "customer";
  text: string;
};

const content = {
  en: {
    open: "Open customer help",
    close: "Close customer help",
    title: "Fiber Link Help",
    label: "Automated assistant",
    greeting:
      "Hi! I can help with general questions about packages, payments, and activation. I can’t access accounts or contact a live agent.",
    privacy: "Please don’t send passwords, payment details, or private documents here.",
    input: "Type a general question...",
    send: "Send message",
    voice: "Ask by voice",
    speaking: "Read this reply aloud",
    voiceUnsupported: "Voice input is not supported in this browser. You can still type your question.",
    voicePermission: "Allow microphone access in your browser to ask by voice.",
    voiceError: "Voice input could not start. Check microphone access and try again.",
    voiceNoSpeech: "No speech was detected. Try again or type your question.",
    listening: "Listening… speak now",
    voiceHint: "Voice uses your browser’s speech service. English works best; Roman Urdu voice support depends on your browser.",
    contact: "Contact information",
    contactLink: "Open Contact page",
    prompts: ["Packages", "Payment proof", "Activation"],
    answers: [
      "Package names, prices, speeds, and coverage are not configured yet. Visit Packages to see availability once Fiber Link publishes verified plans.",
      "Payment instructions are not configured yet. The portal does not process payments. Only follow payment instructions provided directly by Fiber Link, and never share banking details in this chat.",
      "Payment approval does not automatically activate internet service. Activation should be shown only after Fiber Link confirms provisioning.",
      "I can only answer general questions and cannot see your account or subscription. Account sign-in and customer support are not connected yet. Open Contact for the current support setup status.",
      "I’m a basic automated helper, not a live person. I can answer general questions about packages, payment proof, and activation, but I can’t access accounts or check request status.",
      "I can help with general questions about packages, payment proof, and activation. For this preview, no live agent or account support is connected. Try one of the suggested topics.",
    ],
  },
  "roman-ur": {
    open: "Customer help kholein",
    close: "Customer help band karein",
    title: "Fiber Link Madad",
    label: "Khudkar madadgar",
    greeting:
      "Salam! Main packages, payment, aur activation ke aam sawalat mein madad kar sakta hoon. Main account nahi dekh sakta aur live agent se rabta nahi kar sakta.",
    privacy: "Yahan password, payment details, ya private documents share na karein.",
    input: "Aam sawal likhein...",
    send: "Paigham bhejein",
    voice: "Bol kar sawal karein",
    speaking: "Yeh jawab sunain",
    voiceUnsupported: "Is browser mein voice input mojood nahi. Aap sawal type kar sakte hain.",
    voicePermission: "Bol kar sawal karne ke liye browser mein microphone ki ijazat dein.",
    voiceError: "Voice input shuru nahi ho saka. Microphone ki ijazat check kar ke dobara koshish karein.",
    voiceNoSpeech: "Awaaz samajh nahi aayi. Dobara koshish karein ya sawal type karein.",
    listening: "Sun raha hoon… ab boliye",
    voiceHint: "Roman Urdu Latin letters mein bolain. Browser Pakistani English pehchan aur voice istemal karta hai; natayij aur talaffuz browser par munhasir hain.",
    contact: "Rabay ki maloomat",
    contactLink: "Contact page kholein",
    prompts: ["Internet packages", "Payment proof", "Activation"],
    answers: [
      "Package ke naam, qeemat, speed, aur coverage abhi configure nahi huay. Tasdeeq shuda plans publish honay par Packages page dekhein.",
      "Payment ki hidayaat abhi configure nahi huin. Portal payment process nahi karta. Sirf Fiber Link ki di hui tasdeeq shuda hidayaat par amal karein, aur chat mein bank ki tafseel share na karein.",
      "Payment approve honay se internet khud-ba-khud active nahi hota. Fiber Link ki provisioning tasdeeq ke baad hi service active dikhani chahiye.",
      "Main sirf aam sawalat ka jawab de sakta hoon, aap ka account ya subscription nahi dekh sakta. Sign-in aur customer support abhi connect nahi huay. Support ki mojooda maloomat ke liye Contact dekhein.",
      "Main automated helper hoon, live insan nahi. Main package, payment proof, aur activation ke aam sawalat mein madad kar sakta hoon, lekin account ya request status nahi dekh sakta.",
      "Main packages, payment proof, aur activation ke aam sawalat mein madad kar sakta hoon. Is preview mein live agent ya account support connect nahi hai. Diye gaye topics mein se koi chunein.",
    ],
  },
} as const;

function getAnswer(question: string, locale: "en" | "roman-ur") {
  const normalized = question.toLowerCase();
  const t = content[locale];

  if (/who|human|person|agent|bot|assistant|insan|live|kaun|kon|asli banda/.test(normalized)) {
    return t.answers[4];
  }
  if (/price|package|packages|plan|speed|coverage|qeemat|kitne|kitnay|raftaar/.test(normalized)) {
    return t.answers[0];
  }
  if (/payment|pay|receipt|proof|bank|wallet|paisa|paise|adaigi|jama|raqm|transfer/.test(normalized)) {
    return t.answers[1];
  }
  if (/activat|install|connection|provision|active|internet|connect|net|kab chalay|kab chale/.test(normalized)) {
    return t.answers[2];
  }
  if (/account|subscription|status|request|login|sign.?in|mera account|meri request|darkhwast/.test(normalized)) {
    return t.answers[3];
  }
  return t.answers[5];
}

export function HelpAssistant() {
  const locale = useAppPreferences();
  const t = content[locale];
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, author: "assistant", text: t.greeting },
  ]);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const nextMessageId = useRef(1);

  useEffect(() => () => recognitionRef.current?.abort(), []);

  function speak(text: string) {
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      setVoiceStatus(t.voiceUnsupported);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const speechLanguage = "en-PK";
    utterance.lang = speechLanguage;
    const voices = window.speechSynthesis.getVoices();
    const voice =
      voices.find((candidate) => candidate.lang.toLowerCase() === speechLanguage.toLowerCase()) ??
      voices.find((candidate) => candidate.lang.toLowerCase().startsWith("en"));
    if (voice) utterance.voice = voice;
    utterance.onerror = () => setVoiceStatus(t.voiceError);
    window.speechSynthesis.speak(utterance);
  }

  function sendMessage(text: string, speakReply = false) {
    const question = text.trim();
    if (!question) return;

    const answer = getAnswer(question, locale);
    const customerMessageId = nextMessageId.current++;
    const assistantMessageId = nextMessageId.current++;
    setMessages((current) => [
      ...current,
      { id: customerMessageId, author: "customer", text: question },
      { id: assistantMessageId, author: "assistant", text: answer },
    ]);
    setDraft("");
    setVoiceStatus("");
    if (speakReply) speak(answer);
  }

  function startVoiceInput() {
    const Recognition =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Recognition) {
      setVoiceStatus(t.voiceUnsupported);
      return;
    }

    recognitionRef.current?.abort();
    const recognition = new Recognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.lang = "en-PK";
    recognition.onstart = () => {
      setListening(true);
      setVoiceStatus(t.listening);
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript.trim();
      if (transcript) {
        setVoiceStatus("");
        sendMessage(transcript, true);
      } else {
        setVoiceStatus(t.voiceNoSpeech);
      }
    };
    recognition.onerror = (event) => {
      setListening(false);
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setVoiceStatus(t.voicePermission);
      } else if (event.error === "no-speech") {
        setVoiceStatus(t.voiceNoSpeech);
      } else {
        setVoiceStatus(t.voiceError);
      }
    };
    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    try {
      setVoiceStatus("");
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setListening(false);
      setVoiceStatus(t.voiceError);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(draft);
  }

  return (
    <div className="help-assistant">
      {open && (
        <section
          className="help-panel"
          aria-label="Fiber Link automated customer help"
          aria-live="polite"
        >
          <div className="help-panel-header">
            <span className="help-avatar"><Bot size={19} /></span>
            <span className="help-title">
              <strong>{t.title}</strong>
              <small>{t.label}</small>
            </span>
            <button
              className="help-close"
              type="button"
              aria-label={t.close}
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>
          </div>
          <div className="help-messages">
            {messages.map((message) => (
              <p
                className={`help-message ${message.author}`}
                key={message.id}
              >
                {message.id === 0 ? t.greeting : message.text}
                {message.author === "assistant" && (
                  <button
                    className="help-speak-button"
                    type="button"
                    aria-label={t.speaking}
                    onClick={() => speak(message.id === 0 ? t.greeting : message.text)}
                  >
                    <Volume2 size={13} />
                  </button>
                )}
              </p>
            ))}
            <div className="help-suggestions" aria-label="Suggested questions">
              {t.prompts.map((prompt) => (
                <button
                  type="button"
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
            <p className="help-privacy">{t.privacy}</p>
            <p className="help-voice-hint">{t.voiceHint}</p>
          </div>
          <form className="help-form" onSubmit={handleSubmit}>
            <input
              aria-label={t.input}
              placeholder={t.input}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={400}
            />
            <button
              className={`help-voice-button${listening ? " listening" : ""}`}
              type="button"
              aria-label={listening ? t.listening : t.voice}
              aria-pressed={listening}
              onClick={startVoiceInput}
            >
              <Mic size={16} />
            </button>
            <button type="submit" aria-label={t.send} disabled={!draft.trim()}>
              <Send size={16} />
            </button>
          </form>
          <p className="help-voice-status" aria-live="polite">{voiceStatus}</p>
          <Link
            className="help-contact-link"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            {t.contactLink}<ArrowUpRight size={13} />
          </Link>
        </section>
      )}
      <button
        className={`help-launcher${open ? " is-open" : ""}`}
        type="button"
        aria-label={open ? t.close : t.open}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={21} /> : <MessageCircle size={21} />}
        {!open && <span>{t.contact}</span>}
      </button>
    </div>
  );
}
