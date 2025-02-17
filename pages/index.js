import Head from 'next/head';
import Image from 'next/image';
import {useState} from 'react';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {

  const [userInput, setUserInput] = useState('')
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGeneratingEndpoint = async () => {
    
    setIsGenerating(true)
    console.log("Calling OpenAPI")
    const response = await fetch('api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userInput})

    })

    const data = await response.json()
    const { output } = data
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`)
    setIsGenerating(false)

  }

  const onUserChnagedText = (event) => {
    console.log(event.target.value)
    setUserInput(event.target.value)
  }

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | Mohanad Kandil</title>
     </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>sup, insert your headline here</h1>
          </div>
          <div className="header-subtitle">
            <h2>insert your subtitle here</h2>
          </div>
        </div>
      <div className='prompt-container'>
          <textarea placeholder='start typing here' className='prompt-box' value={userInput} onChange={onUserChnagedText} />
      </div>
    <div className='prompt-buttons'>
    <a className='generate-button' onClick={callGeneratingEndpoint}>
    <div className='generate'>
      <p>Generate</p>
    </div>
    </a>
    </div>
    {apiOutput && (
      <div className='output'>
        <div className='output-header-container'>
          <div className='output-header'>
          <h3>Output</h3>
      </div>
      </div>
        <div className='output-content'>
          <p>{apiOutput}</p>
      </div>
      </div>
    )}
      </div> <div className="badge-container grow"> <a href="https://buildspace.so/builds/ai-writer" target="_blank" rel="noreferrer" >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};
