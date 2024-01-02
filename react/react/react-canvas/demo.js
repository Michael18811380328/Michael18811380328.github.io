import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Stage, Layer, Text, Image as KImage, Circle } from 'react-konva';

const { qrcodeSrc } = window.app.pageOptions;

class InvitePoster extends Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const { width, height, textY, avatarY, qrcodeY, scale } = this.getPosterSize();
    const bgImage = {
      name: 'bgImage',
      width: width,
      height: height,
      url: `poster-background.jpg`
    };
    const avatarImage = {
      name: 'avatarImage',
      width: 50,
      height: 50,
      url: appAvatarURL
    };
    const qrcodeImage = {
      name: 'qrCodeImage',
      width: 60,
      height: 60,
      url: qrcodeSrc
    };

    try {
      const backImg = await this.loadImage(bgImage);
      const avatarImg = await this.loadImage(avatarImage);
      const qrcodeImg = await this.loadImage(qrcodeImage);
      this.setState({
        posterWidth: width,
        posterHeight: height,
        textY,
        avatarY,
        qrcodeY,
        scale,
        backImg,
        avatarImg,
        qrcodeImg,
        isLoading: false,
      });
    } catch(err) {
      this.setState({isLoading: false});
    }
    window.addEventListener('resize', this.resize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getPosterSize = () => {
    const width = document.querySelector('body').offsetWidth;
    const height = document.querySelector('body').offsetHeight;
    let bgImageWidth = width - 2 * 30;
    let bgImageHeight = height - 2 * 30 - 40;
    if (width <= 320) {
      return {
        width: bgImageWidth,
        height: bgImageHeight,
        avatarY: 285,
        textY: 310,
        qrcodeY: 410,
        scale: 0.8
      };
    }

    if (width === 360 && height === 640) {
      // android
      return {
        width: bgImageWidth,
        height: 540,
        avatarY: 330,
        textY: 360,
        qrcodeY: 475,
        scale: 0.9
      };
    }

    if (width <= 375) {
      if (bgImageHeight > 700) {
        return {
          width: 340,
          height: 620,
          avatarY: 390,
          textY: 420,
          qrcodeY: 547,
          scale: 1
        };
      }
      return {
        width: bgImageWidth,
        height: bgImageHeight,
        avatarY: 350,
        textY: 380,
        qrcodeY: 495,
        scale: 1
      };
    } 

    if (width < 768) {
      return {
        width: 340,
        height: 620,
        avatarY: 390,
        textY: 420,
        qrcodeY: 547,
        scale: 1
      };
    }

    if (width >= 768) { // pc
      return {
        width: 340,
        height: 620,
        avatarY: 390,
        textY: 420,
        qrcodeY: 547,
        scale: 1
      };
    }
  }

  loadImage = (imgInfo) => {
    return new Promise((resolve, reject) => {
      const { width, height, url } = imgInfo;
      let img = new Image();
      img.src = url;
      img.width = width;
      img.height = height;
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        reject(imgInfo);
      };
    });
  }

  resize = async () => {
    const { width, height, textY, avatarY, qrcodeY, scale } = this.getPosterSize();
    const bgImage = {
      name: 'bgImage',
      width: width,
      height: height,
      url: `background.jpg`
    };
    const backImg = await this.loadImage(bgImage);
    this.setState({
      backImg: backImg,
      posterWidth: width,
      posterHeight: height,
      textY,
      avatarY,
      qrcodeY,
      scale
    });
  }

  genPosterImg = (instance) => {
    if (instance) {
      // 生成图片，手机可以长按保存
      let posterImg = new Image();
      posterImg.crossOrigin = 'anonymous';
      posterImg.src = instance.toDataURL({pixelRatio: 2});
      posterImg.style.cssText = 'width:100%;height:100%;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;';

      document.body.appendChild(posterImg);
    }
  }

  render() {
    let { backImg, avatarImg, qrcodeImg, isLoading } = this.state;
    const { posterWidth, posterHeight, avatarY, textY, qrcodeY, scale } = this.state;
    return (
      <div className='poster-invite'>
        <div className="poster-container">
          <Stage width={posterWidth} height={posterHeight} ref={this.genPosterImg}>
            <Layer scaleY={1.0} scaleX={1.0}>
              <KImage
                x={0}
                y={0}
                width= {backImg.imgWidth}
                height={backImg.imgHeight}
                image={backImg}
              />
              <Circle
                x={42}
                y={avatarY}
                radius={25}
                fillPatternImage={avatarImg}
                fillPatternRepeat={'no-repeat'}
                fillPatternOffsetX={36}
                fillPatternOffsetY={36}
                scaleX={scale}
                scaleY={scale}
              />
              <Text
                x={18}
                y={textY}
                text={name}
                fontSize={18}
                fill={'#72340b'}
                scaleX={scale}
                scaleY={scale}
              />
              <KImage
                x={2}
                y={qrcodeY}
                scaleX={scale}
                scaleY={scale}
                width={qrcodeImg.width}
                height={qrcodeImg.height}
                image={qrcodeImg}
              />
            </Layer>
          </Stage>
        </div>
        <span className="poster-tips-test">press to save image</span>
      </div>
    );
  }
}