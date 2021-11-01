import React, { useState, useRef, useMemo } from 'react';
import './Toast.css';
import ImageEditor from 'tui-image-editor';

const ratio = 0.26666;

const options = {
  // cssMaxWidth: 700,
  // cssMaxHeight: 500,
  // selectionStyle: {
  //   cornerSize: 20,
  //   rotatingPointOffset: 70,
  // }
}

const Toast = (props: any) => {
  const [sourceInstance, setSourceInstance] = useState<any>(null);
  const [targetInstance, setTargetInstance] = useState<any>(null);
  const source = useRef<any>(null);
  const target = useRef<any>(null);
  const isNull = useMemo(() => {
    return (sourceInstance === null) && (targetInstance === null)
  }, [sourceInstance, targetInstance]);

  const getElement = (type: string) => {
    return type === 'source' ? source.current : target.current;
  };

  const getInstance = (element: any) => {
    if (element) {
      try {
        const newInstance = new ImageEditor(element, {
          ...options,
        });
        return newInstance;
      } catch (e) {
        console.error(e);
        return null;
      }
    }
    return null;
  };

  const upload = (e: any) => {
    // get file
    const file = e.target.files[0];
    console.log('file', file);
    if (file === null) {
      alert('파일 업로드 실패!');
      return false;
    }

    // create instance and load image from file
    loadImage('source', setSourceInstance, file);
    loadImage('target', setTargetInstance, file);
  };

  const loadImage = async (type: string, setInstance: any, file: any) => {
    const element = getElement(type);
    const instance = getInstance(element);
    if (instance === null) {
      alert(type + ' 인스턴스 생성 오류!');
      return false;
    }

    const result = await instance.loadImageFromFile(file);
    element.style.width = `100%`;
    element.style.height = `${result.newHeight * ratio}px`;

    instance.resizeCanvasDimension({
      width: result.newWidth * ratio,
      height: result.newHeight * ratio,
    });

    setInstance(instance);
  };

  const clearInstances = () => {
    clear(source, sourceInstance, setSourceInstance);
    clear(target, targetInstance, setTargetInstance);
  };

  const clear = (ref: any, instance: ImageEditor, setInstance: any) => {
    instance.clearObjects();
    setInstance(null);
    ref.current.innerHTML = '';
  };

  return (
    <div className="container">
      {
        (isNull) ? (
          <div>
            <p>로컬 파일 업로드</p>
            <input type="file" accept="image/*, .psd" onChange={upload} />
          </div>
        ) : (
          <div>
            <button onClick={clearInstances}>초기화</button>
            <Tools instance={targetInstance} />
          </div>
        )
      }
      <div className="section-flex">
        <div className="cover origin">
          <div id="tui-image-editor" ref={source}></div>
        </div>
        <div className="cover editable">
          <div id="tui-image-editor" ref={target}></div>
        </div>
      </div>
    </div>
  );
};

export default Toast;

type ToolsProps = {
  instance: ImageEditor;
};

const Tools = ({
  instance
}: ToolsProps) => {
  const addText = () => {
    instance.addText('insert text', {
      styles: {
        /*
          -webkit-text-stroke: 1px rgb(17, 17, 17, 0.5);
          color: rgb(255, 255, 255, 0.5);
        */
        fill: '#fff',
        fontSize: 72,
        fontWeight: 'bold'
      },
      position: {
          x: 100,
          y: 500
      }
    }).then(objectProps => {
      console.log(objectProps.id);
    });
  };
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
      <li onClick={addText}>Text</li>
      <li>Mask</li>
      <li>Filter</li>
    </ul>
  )
}