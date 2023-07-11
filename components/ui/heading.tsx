import React from 'react';

interface HeadingProps {
  title: string;
  description: string;
}

export const Heading: React.FC<HeadingProps> = (props) => {
  return (
    <div>
      <h2 className='text-3xl font-bold tracking-tight'>{props.title}</h2>
      <p className='text-sm text-muted-foreground'>{props.description}</p>
    </div>
  );
};
