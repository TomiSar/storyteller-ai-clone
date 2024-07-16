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

function StoryWriter() {
  const [story, setStory] = useState<string>('');
  const [pages, setPages] = useState<number>();
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
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          className='w-full bg-purple-400'
          size='lg'
          disabled={!story || !pages}
        >
          Genarate Story
        </Button>
      </section>
      <section className='flex-1 pb-5 mt-5'></section>
    </div>
  );
}

export default StoryWriter;
