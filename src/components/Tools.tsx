import React from 'react';

type ToolsProps = {
  addText: any;
};

/**
 * @todo 한번 클릭 -> 준비완료 -> 한번 더 클릭 -> 클릭위치 가져오기 -> 해당 위치에 텍스트 생성
 */
const Tools = (props: ToolsProps) => {
  return (
    <ul className="tools">
      <li>Undo</li>
      <li>Redo</li>
      <li>ClearObjects</li>
      <li>RemoveActiveObject</li>
      <li>Crop</li>
      <li>Flip</li>
      <li>Rotation</li>
      <li>DrawLine</li>
      <li>Shape</li>
      <li>Icon</li>
      <li onClick={props.addText}>Text</li>
      <li>Mask</li>
      <li>Filter</li>
    </ul>
  )
};

Tools.defaultProps = {
  addText: () => {},
};

export default Tools;