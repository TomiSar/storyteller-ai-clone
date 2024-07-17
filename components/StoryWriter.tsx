'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

const storiesPath = 'public/stories';

function StoryWriter() {
  const [story, setStory] = useState<string>('');
  const [pages, setPages] = useState<number>();
  const [progress, setProgress] = useState('');
  const [runStarted, setRunStarted] = useState<boolean>(false);
  const [runFinished, setRunFinished] = useState<boolean | null>(null);
  const [currentTool, setCurrentTool] = useState('');

  async function runScript() {
    setRunStarted(true);
    setRunFinished(false);

    const response = await fetch('/api/run-script', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ story, pages, path: storiesPath }),
    });

    if (response.ok && response.body) {
      // Handle Streams from the API
      // ...
      console.log('Streamiong started');
      // ...
    } else {
      setRunFinished(true);
      setRunStarted(false);
      console.error('Failed to start streaming');
    }
  }

  return (
    <div className='flex flex-col container'>
      <section className='flex flex-1 flex-col border border-purple-300 rounded-md p-10 space-y-2'>
        <Textarea
          className='flex-1 text-black'
          placeholder='Write a story about a robot and human who became a friend..'
          value={story}
          onChange={(e) => setStory(e.target.value)}
        />
        <Select onValueChange={(value) => setPages(parseInt(value))}>
          <SelectTrigger>
            <SelectValue
              className=''
              placeholder='How many pages should the story be?'
            />
          </SelectTrigger>
          <SelectContent className='w-full'>
            {Array.from({ length: 10 }, (_, i) => (
              <SelectItem key={i} value={String(i + 1)}>
                {i + 1} page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          className='w-full bg-purple-400'
          size='lg'
          disabled={!story || !pages || runStarted}
          onClick={runScript}
        >
          Genarate Story
        </Button>
      </section>
      <section className='flex-1 pb-5 mt-5'>
        <div className='flex flex-col-reverse w-full space-y-2 bg-gray-800 rounded-md text-gray-200 font-mono p-10 h-96 overflow-y-auto'>
          <div>
            {runFinished === null && (
              <>
                <p className='animate-pulse mr-5'>
                  Is waiting for you to generate a Story above...
                </p>
                <br />
              </>
            )}
            <span className='mr-5'>{'>>'}</span>
            {progress}
          </div>
          {/* current tool */}
          {currentTool && (
            <div className='py-18'>
              <span className='mr-5'>{'--- (Current Tool) ---'}</span>
              {currentTool}
            </div>
          )}

          {runStarted && (
            <div>
              <p className='animate-in mr-5'>
                {'--- (AI Storyteller Has Started!!) ---'}
              </p>
              <br />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default StoryWriter;
