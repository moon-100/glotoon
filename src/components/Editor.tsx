import React, { useRef } from 'react';
import styled from 'styled-components';

interface Position {
  x: number;
  y: number;
}

type Props = {
  position: Position;
  text: string;
};

/**
 * @todo drag and drop
 * @todo resize
 * @todo edit text (size, color)
 */
const Editor = (props: Props) => {
  const textarea = useRef<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('change', e.target.value);
  };

  return (
    <Wrapper {...props.position}>
      <textarea 
        ref={textarea} 
        onChange={handleChange}
      />
    </Wrapper>
  )
};

Editor.defaultProps = {
  position: {
    x: 0, 
    y: 0
  }
}

export default Editor;

const Wrapper = styled.div<Position>`
  position: absolute;
  top: ${(p) => p.y}px;
  left: ${(p) => p.x}px;
`;