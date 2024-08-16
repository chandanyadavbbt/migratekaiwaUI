import {
  IconCheck,
  IconCopy,
  IconEdit,
  IconRobot,
  IconTrash,
  IconUser,
} from '@tabler/icons-react';
import { FC, memo, useContext, useEffect, useRef, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { updateConversation } from '@/utils/app/conversation';

import { Message } from '@/types/chat';

import HomeContext from '@/pages/api/home/home.context';

import { CodeBlock } from '../Markdown/CodeBlock';
import { MemoizedReactMarkdown } from '../Markdown/MemoizedReactMarkdown';

import rehypeMathjax from 'rehype-mathjax';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { Chart as ChartJS } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import GraphComponents from "./GraphComponents"
import Home from '@/pages/api/home/home';
import LottiePlayer from './LottiePlayer';
import LottiePlayerLogo from "./LottiePlayerLogo"
import KaiwaPlayer from "./KaiwaPlayer"


export interface Props {
  message: Message;
  messageIndex: number;
  onEdit?: (editedMessage: Message) => void
}


interface DataPoint {
  country_or_region: string;
  score: number;
}

// let mainArray: DataPoint[] = [];

export const ChatMessage: FC<Props> = memo(({ message, messageIndex, onEdit }) => {
  const { t } = useTranslation('chat');

  const {
    state: { selectedConversation, conversations, currentMessage, messageIsStreaming,autoSpeech },
    dispatch: homeDispatch,
  } = useContext(HomeContext);
  // conversation contain all chats question and answer as array of obj
  // console.log(conversations,"converstion")

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messageContent, setMessageContent] = useState(message.content);
  const [messagedCopied, setMessageCopied] = useState(false);
  const [backendImg,setBackendImg]=useState(false);
  const [imgUrlAi,setImgUrlAi]=useState("")
  const [jsonData, setJsonData] = useState<any[]>([]);
  const [imgUrl,setImgUrl] = useState('')
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioInstance, setAudioInstance] = useState(null);
  const [kaiwaPlayer,setKawiaPlayer]=useState<boolean>(false)
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number | null>(null);
  const [playMsg,setPlayMsg]=useState(false)
  
  // console.log(isSpeaking,"isPlaying")

  // this is graph popup
  const [graphPopup, setGraphPopup]=useState<boolean>(false)
  // this is auto play when we send data by STT
  // const [autoSpeech,setAutoSpeech]=useState<boolean>(false)
  const speechSynthesisRef = useRef(null);


  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageContent(event.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleEditMessage = () => {
    if (message.content != messageContent) {
      if (selectedConversation && onEdit) {
        onEdit({ ...message, content: messageContent });
      }
    }
    setIsEditing(false);
  };

  const handleDeleteMessage = () => {
    if (!selectedConversation) return;

    const { messages } = selectedConversation;
    const findIndex = messages.findIndex((elm) => elm === message);

    if (findIndex < 0) return;

    if (
      findIndex < messages.length - 1 &&
      messages[findIndex + 1].role === 'assistant'
    ) {
      messages.splice(findIndex, 2);
    } else {
      messages.splice(findIndex, 1);
    }
    const updatedConversation = {
      ...selectedConversation,
      messages,
    };

    const { single, all } = updateConversation(
      updatedConversation,
      conversations,
    );
    homeDispatch({ field: 'selectedConversation', value: single });
    homeDispatch({ field: 'conversations', value: all });
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !isTyping && !e.shiftKey) {
      e.preventDefault();
      handleEditMessage();
    }
  };

  const copyOnClick = () => {
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(message.content).then(() => {
      setMessageCopied(true);
      setTimeout(() => {
        setMessageCopied(false);
      }, 2000);
    });
  };

  useEffect(() => {
    setMessageContent(message.content);
  }, [message.content]);


  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing]);

  // useEffect(() => {
  //   const getImg = async () => {
  //     try {
  //       const text = messageContent;
  //       const regex = /https:\/\/(.*?\.jpg)/;
  //       const match = text.match(regex);
        
  //       if (match) {
  //         const capturedText = match[1];
  //         setBackendImg(true);
  //         setImgUrlAi(capturedText);
          
  //         const fetchImage = async () => {
  //           try {
  //             const response = await fetch(`https://${capturedText}`);
  //             if (!response.ok) {
  //               throw new Error('Network response was not ok');
  //             }
              
  //             const data = await response.blob();
  //             const imgUrl = URL.createObjectURL(data);
  //             setImgUrl(imgUrl);
  //           } catch (error) {
  //             console.error('Error fetching image:', error);
  //           }
  //         };
  
          
  //         await fetchImage();
  
          
  //         const intervalId = setInterval(async () => {
  //           await fetchImage();
  //         }, 1000);
  
        
  //         return () => clearInterval(intervalId);
  //       } else {
  //         console.log("No match found");
  //       }
  //     } catch (error) {
  //       console.error('Error processing image:', error);
  //     }
  //   };
  
  //   getImg();
  // }, [messageContent]);

  // stt
  // typing effect
  // useEffect(() => {
  //   if (message.role === 'assistant' && messageIndex === selectedConversation.messages.length - 1) {
  //     setCurrentMessageIndex(messageIndex);
  //     let index = 0;
  //     const intervalId = setInterval(() => {
  //       setDisplayedContent((prev) => prev + message.content[index]);
  //       index++;
  //       if (index >= message.content.length) {
  //         clearInterval(intervalId);
  //       }
  //     },10); // Adjust typing speed by changing the interval
  //     return () => clearInterval(intervalId);
  //   } else {
  //     setDisplayedContent(message.content); // Directly set the content for all other messages
  //   }
  // }, [message.content, message.role, messageIndex, selectedConversation.messages.length]);
  
 

  let speak = async (text) => {
    try {
      const apiKey = 'AIzaSyD3IaAau39OTb4VdtX-zgmwrI97dup8exw';
      const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
      const requestPayload = {
        input: { text },
        voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
        audioConfig: { audioEncoding: 'MP3' },
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });

      const data = await response.json();
      const audioContent = data.audioContent;
      const audioBlob = new Blob([Uint8Array.from(atob(audioContent), c => c.charCodeAt(0))], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);

      const newAudioInstance = new Audio(audioUrl);
      newAudioInstance.play();

      newAudioInstance.onended = () => {
        setIsSpeaking(false);
        localStorage.removeItem("isPlaying");
      };

      setAudioInstance(newAudioInstance);
      setIsSpeaking(true);
      localStorage.setItem("isPlaying", "true");
    } catch (error) {
      console.error('Error synthesizing speech:', error);
      alert('Error synthesizing speech. Please try again later.');
    }
  };


  const stopSpeaking = () => {
    if (audioInstance) {
      audioInstance.pause();
      audioInstance.currentTime = 0; // Reset the audio to the beginning
      setIsSpeaking(false);
      localStorage.removeItem("isPlaying");
      setAudioInstance(null);
    }
  };
   // useEffect to check localStorage for autoSST flag
 

  // hanlde popup for graph
  function handleGraph(){
    setGraphPopup(true)
  }
  const closeGraph = () => {
    setGraphPopup(false);
};

useEffect(() => {
  const autoSST = localStorage.getItem('autoSST');
  if (autoSST === 'true' && message.role === 'assistant') {
    speak(message.content);
    setIsSpeaking(true)
    setKawiaPlayer(true)
    localStorage.removeItem('autoSST');
    // setKawiaPlayer(false)
  }
}, [message]); 
const handlePlay = () => {
  const isPlaying = localStorage.getItem("isPlaying");
  if (!isPlaying) {
    speak(message.content); // Ensure `message.content` is defined
  }
};

const handlePause = () => {
  stopSpeaking();
};



  // kaiwaPlayer && console.log("kaiwa")
  return (
    <>
    {kaiwaPlayer && (
    <>
  
  <div className="fixed inset-0 flex items-center justify-center bg-transparent animate-spin">
      <div className="w-[300px] h-[300px] flex items-center justify-center rounded-full bg-custom-radial z-9">
        {/* <LottiePlayer widths={"200px"} heights={"200px"} /> */}
      </div>
    </div>
    </>
  
    
)}
    {graphPopup&&
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
     <div className="bg-white w-4/5 h-4/5 p-4 rounded-lg shadow-lg">
     <GraphComponents messageContent={messageContent} onClose={closeGraph} />
     </div>
   </div>
      }
    <div
      className={`group md:px-4${
        message.role === 'assistant'
        // uichange dark:bg-[#1C417C]
          ? 'border-b border-white/10 bg-transparent text-gray-800 dark:border-white-900/50 dark:bg-transparent dark:text-gray-100'
          : 'border-b border-white/10 bg-transparent text-gray-800 dark:border-white-900/50 dark:bg-transparent dark:text-gray-100'
      }`}
      style={{ overflowWrap: 'anywhere' }}
    >
      <div className="relative m-auto flex p-4 text-base md:max-w-2xl md:gap-6x md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
        <div className="min-w-[40px] text-right font-bold">
          {message.role === 'assistant' ? (
         <div className='-translate-x-1.5'>

            <LottiePlayerLogo/>
         </div> 
          
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </div>

        <div className="prose mt-[-2px] w-full dark:prose-invert">
          {message.role === 'user' ? (
            <div className="flex w-full">
              {isEditing ? (
                <div className="flex w-full flex-col">
                  <textarea
                    ref={textareaRef}
                    className="w-full resize-none whitespace-pre-wrap border-none dark:bg-[#343541]"
                    value={messageContent}
                    onChange={handleInputChange}
                    onKeyDown={handlePressEnter}
                    onCompositionStart={() => setIsTyping(true)}
                    onCompositionEnd={() => setIsTyping(false)}
                    style={{
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      lineHeight: 'inherit',
                      padding: '0',
                      margin: '0',
                      overflow: 'hidden',
                    }}
                  />

                  <div className="mt-10 flex justify-center space-x-4 bg-black-500">
                    <button
                      className="h-[40px] rounded-md bg-blue-500 px-4 py-1 text-sm font-medium text-white enabled:hover:bg-blue-600 disabled:opacity-50"
                      onClick={handleEditMessage}
                      disabled={messageContent.trim().length <= 0}
                    >
                      {t('Save & Submit')}
                    </button>
                    <button
                      className="h-[40px] rounded-md border border-neutral-300 px-4 py-1 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                      onClick={() => {
                        setMessageContent(message.content);
                        setIsEditing(false);
                      }}
                    >
                      {t('Cancel')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="prose whitespace-pre-wrap dark:prose-invert flex-1">
                  {message.content}
                </div>
              )}

              {!isEditing && (
                <div className="md:-mr-8 ml-1 md:ml-0 flex flex-col md:flex-row gap-4 md:gap-1 items-center md:items-start justify-end md:justify-start">
                  <button
                    className="invisible group-hover:visible focus:visible text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    onClick={toggleEditing}
                  >
                    <IconEdit size={20} />
                  </button>
                  <button
                    className="invisible group-hover:visible focus:visible text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    onClick={handleDeleteMessage}
                  >
                    <IconTrash size={20} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-row">
              <MemoizedReactMarkdown
                className="prose dark:prose-invert flex-1"
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeMathjax]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    if (children.length) {
                      if (children[0] == '▍') {
                        return <span className="animate-pulse cursor-default mt-1">▍</span>
                      }

                      children[0] = (children[0] as string).replace("`▍`", "▍")
                    }

                    const match = /language-(\w+)/.exec(className || '');
                    return !inline ? (
                      <CodeBlock
                        key={Math.random()}
                        language={(match && match[1]) || ''}
                        value={String(children).replace(/\n$/, '')}
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
           
                
                
                }}
              >
               {messageIndex === currentMessageIndex ? displayedContent : message.content}
               
              </MemoizedReactMarkdown>
              
              <div className="md:-mr-8 ml-1 md:ml-0 flex flex-col md:flex-row gap-4 md:gap-1 items-center md:items-start justify-end md:justify-start">
                {messagedCopied ? (
                  <IconCheck
                    size={20}
                    className="text-green-500 dark:text-green-400"
                  />
                ) : (
                  <button
                    className="invisible group-hover:visible focus:visible text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    onClick={copyOnClick}
                  >
                    <IconCopy size={20} />
                  </button>
                  
                )} 
                {/* Image URL location set */}
                <div style={{ display: 'grid', placeItems: 'center' }}>
                  {backendImg && <img src={imgUrl} style ={{width:'400px',maxWidth:'100%'}} alt="Fetched Image" />}
                
                </div>
               
                  <div style={{ width: "40px" }}>
        <button style={{ cursor: "pointer", width: "25px", borderRadius: "8px" }} >
          {isSpeaking ? (
            
            <svg onClick={handlePause} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" disabled={isPlaying} >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            
          ) : (
            
            <svg  onClick={handlePlay} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"  disabled={!isPlaying}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
            </svg>
            
          )}
        </button>
      </div>
                <div onClick={handleGraph} style={{width:"25px",transform:"translateX(-10px)",borderRadius:"8px",cursor:"pointer"}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
</svg>

 
                </div>  
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
});
ChatMessage.displayName = 'ChatMessage';



