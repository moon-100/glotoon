import React, { useState, useRef, useEffect } from 'react';
import PSD from 'psd';
import './Glotoon.css';
import Loading from '../../components/Loading';
import Tools from '../../components/Tools';
import Editor from '../../components/Editor';

const ratio = 0.26666;

const Glotoon = (props: any) => {
  const [loading, setLoading] = useState(false);
  const source = useRef<any>(null);
  const target = useRef<any>(null);
  const [dataList, setDataList] = useState<any>([]);

  const upload = async (e: any) => {
    setLoading(true);
    const start = new Date();

    // get file
    const file = e.target.files[0];
    if (file === null) {
      alert('파일 업로드 실패!');
      return false;
    }

    const psd = await PSD.fromDroppedFile(file);
    const png = await psd.image.toPng();
    if (png) {
      appendImage(source, png.cloneNode(true));
      appendImage(target, png.cloneNode(true));
    }

    setLoading(false);
    const end = new Date();
    console.log('실행시간 : ', (end.getTime() - start.getTime()));

    /*
        BASE64 to canvas 필요한가?
        const base64 = await psd.image.toBase64();
    */
  //  const base64 = await psd.image.toBase64();
  //  convertBase64ToCanvas(base64);
  };

  // const convertBase64ToCanvas = (base64: string) => {
  //   const canvas = document.createElement('canvas');
  //   const context = canvas.getContext('2d');
  //   const image = new Image();
  //   image.onload = function () {
  //     context?.drawImage(image, 0, 0);
  //   };
  //   image.src = base64;
  //   appendImage(target, canvas);
  // };

  const resizingImage = (image: HTMLImageElement | HTMLCanvasElement) => {
    const height = image.height * ratio;
    image.style.width = '100%';
    image.style.height = height + 'px';
    return image;
  };

  const appendImage = (ref: React.MutableRefObject<any>, image: HTMLImageElement | HTMLCanvasElement) => {
    ref.current?.appendChild(resizingImage(image));
  };

  const handleAddText = () => {
    const newData = {
      position: {
        x: Math.random() * 100, 
        y: Math.random() * 1000,
      },
      text: 'insert text'
    };

    setDataList(dataList.concat(newData));
  };

  return (
    <div className="container">
      <div>
        <p>로컬 파일 업로드</p>
        <input type="file" accept="image/*, .psd" onChange={upload} />
        {loading ? <Loading /> : ''}
      </div>
      <Tools 
        addText={handleAddText}
      />
      <div className="section-flex">
        <div className="cover origin">
          <div id="source" ref={source}></div>
        </div>
        <div className="cover editable">
          {
            dataList.map((data: any, index: number) => <Editor key={index} {...data} />)
          }
          <div id="target" ref={target}></div>
        </div>
      </div>
    </div>
  )
}

export default Glotoon;