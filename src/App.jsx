import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Play from './assets/Icons/Play.png'
import { AnimatePresence, easeIn, motion } from 'framer-motion'
import { useParams } from 'react-router-dom'

const App = () => {
  //random words to fetch
  const words = ["lounge", "mercy", "waistcoat", "therapy", "twist", "freckle", "headline", "trustee", "ankle", "plunge", "whistle", "lunar", "spray", "obelisk", "gradual", "endow", "butterfly", "banana", "saddle", "vague", "fortune", "fossil", "honeycomb", "abnormal", "caution", "peripheral", "imply", "march", "coach", "pretend", "lunch", "corridor", "alchemy", "escape", "tattoo", "reign", "nonsense", "patent", "temple", "wheat", "vest", "patrol", "unite", "ski", "parcel", "pavilion", "reception", "crow", "gymnasium", "bedroom", "retire", "digestion", "dawn", "cupboard", "ship", "cushion", "plastic", "sonnet", "conquest", "parade", "snatch", "hurdle", "headphones", "vigilant", "chalk", "hijack", "dispute", "chestnut", "hollow", "unpleasant", "stream", "episode", "sneeze", "compromise", "install", "condense", "holiday", "confusion", "voyage", "quarrel", "autonomy", "temper", "trivial", "chorus", "basketball", "virtue", "mutual", "ecstasy", "stereo", "custom", "porcelain", "furnish", "envelope"];
  const { search } = useParams();

  const API_LINK = "https://api.dictionaryapi.dev/api/v2/entries/en";
  const [input, setInput] = useState("");
  const [data, setData] = useState("");
  const [query, setQuery] = useState(words[Math.floor(Math.random() * words.length)]);
  const [voices, setVoices] = useState([]);

  const fetchData = async () => {
    axios.get(`${API_LINK}/${query}`).then(resp => {
      setData(resp.data);
      console.log(resp)
    }).catch(err => {
    })
  }

  useEffect(() => {
    fetchData();

  }, [query])

  useEffect(() => {
    // Get the available voices
    const availableVoices = window.speechSynthesis.getVoices();
    // Set the voices state
    setVoices(availableVoices);
    // Add an event listener to update the voices state when the voices change
    window.speechSynthesis.onvoiceschanged = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const textToSpeech = (text) => {
    // Create a speech synthesis utterance with the text and voice
    const speech = new SpeechSynthesisUtterance(text);
    let voidIndex;
    // Use the first available voice
    try {
      voices.forEach((vc, index) => {
        if (vc.lang == 'en-GB') {
          voidIndex = index;
          throw "found"
        }
      });
    } catch (e) {
      if (e == 'found') {
        speech.voice = voices[voidIndex];
      } else {
        throw e;
      }
    }
    // Speak the text
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className='h-[100%] w-[100%]  justify-center md:px-[20%] px-6 relative dark:bg-[#0e0e16] bg-white pb-8'>
      {
        //new
        data ? <div>
          <motion.form
            initial={{
              opacity: 0,
              y: "-200px"
            }}
            animate={{ opacity: 1, y: "0px" }}
            transition={{ duration: .5, easeIn, delay: .2 }}
            onSubmit={(e) => {
              e.preventDefault();
              setQuery(input)
              // addToHistory(input);
              setInput("")
            }} className='mt-8 flex items-center justify-center w-full '>
            <input className='w-[100%] h-16 dark:text-white rounded-md dark:bg-navDark bg-[#F4F4F4] pl-4 outline-none 
        focus:border-[.5px] focus:border-purple-500 ' type="text" value={input} onChange={handleInputChange} placeholder="Search words..." />
          </motion.form>  

          <motion.div
            initial={{
              opacity: 0,
              x: "-100px"
            }}

            animate={{ opacity: 1, x: "0px" }}
            transition={{ duration: .5, easeIn, delay: .4 }}

            className='mt-10 flex justify-between items-center'>
            <div className='flex flex-col gap-4'>
              <h1 className='md:text-5xl text-2xl font-semibold  dark:text-white'>{data[0]?.word} :) </h1>
              <p className='text-purple-600 font-medium text-2xl'>{data[0]?.phonetics[0]?.text || data[0]?.phonetics[1]?.text}</p>
            </div>
            <button onClick={() => textToSpeech(`${data[0]?.word}`)} className='dark:bg-purple-500/60  bg-slate-800 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full hover:opacity-80 transition-all duration-200 ease-in-out'>
              <img src={Play} className="md:w-7 w-5" alt="play" />
            </button>
          </motion.div>
          <AnimatePresence>
            {data && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: "-100px"
                }}
                animate={{ opacity: 1, x: "0px" }}
                transition={{ duration: .5, easeIn, delay: .6 }}
                className='mt-8 flex flex-col gap-4'>
                {
                  data[0]?.meanings?.map((word, index) => (
                    <div className='' key={index}>
                      <h1 onClick={() => textToSpeech(`${word?.partOfSpeech}`)} className='italic text-2xl font-semibold dark:text-white text-black cursor-pointer'>{word?.partOfSpeech}</h1>
                      <p className='text-lg mt-2 dark:text-gray-200 ml-2'>Example</p>
                      <div>
                        <ul className='mt-2 flex flex-col gap-2'>
                          {
                            word?.definitions.map((def, index) => (
                              <li onClick={() => textToSpeech(`${def?.definition}`)} key={index} className='dark:text-gray-200 list-disc ml-10 cursor-pointer'>{def?.definition}</li>
                            ))

                          }
                        </ul>
                      </div>
                    </div>
                  ))
                }
              </motion.div>
            )}
          </AnimatePresence>
        </div> :
          <div>
            <form className='mt-8 flex items-center justify-center w-full '>
              <input className='w-[100%] h-16 dark:text-white rounded-md dark:bg-navDark bg-[#F4F4F4] pl-4 outline-none 
        focus:border-[.5px] focus:border-purple-500 animate-pulse' type="text" value={input} onChange={handleInputChange} placeholder="" />
            </form>

            <div className='mt-10 flex justify-between items-center'>
              <div className='flex flex-col gap-4'>
                <h1 className='md:text-5xl text-2xl font-semibold  dark:text-white dark:bg-navDark bg-[#F4F4F4] rounded-sm animate-pulse w-[150px] h-[70px]'> </h1>
                <p className='text-purple-600 font-medium text-2xl dark:bg-navDark bg-[#F4F4F4] rounded-sm animate-pulse w-[100px] h-[40px]'></p>
              </div>
              <div className='dark:bg-navDark bg-[#F4F4F4]  animate-pulse w-[70px] h-[70px]   flex items-center justify-center  md:w-20 md:h-20 rounded-full  '>
              </div>
            </div>

            <motion.div
              className='mt-8 flex flex-col gap-4'>

              <div className='' >
                <h1 className='italic text-2xl font-semibold dark:text-white text-black w-full h-10 rounded-sm dark:bg-navDark bg-[#F4F4F4]  animate-pulse'></h1>
                <p className='text-lg mt-2  animate-pulse dark:bg-navDark bg-[#F4F4F4] w-full h-6 rounded-sm'></p>
                <div>
                  <ul className='mt-2 flex flex-col gap-2 w-full h-[150px] rounded-sm dark:bg-navDark bg-[#F4F4F4]  animate-pulse list-none'>
                    <li className='dark:text-gray-200 ml-10 list-none'></li>
                  </ul>
                </div>
              </div>



            </motion.div>
          </div>
      }
      <motion.footer
        initial={{
          opacity: 0,
          x: "-100px"
        }}
        animate={{ opacity: 1, x: "0px" }}
        transition={{ duration: .5, easeIn, delay: .8 }}
        className='mt-10 pb-6 border-t-[.5px] border-blue-200/30 flex items-center gap-4 '>
        <h1 className='dark:text-white italic font-medium cursor-pointer mt-4 ' >Made with 💓 by Dilshad</h1>
        <h1 className=' dark:text-white italic font-medium  mt-4 ' >src code on <span><a href="#" className='text-blue-600 italic font-medium cursor-pointer underline'>Github</a></span></h1>
      </motion.footer>
    </div>
  )
}

export default App