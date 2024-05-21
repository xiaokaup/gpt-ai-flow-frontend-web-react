import 'react-image-crop/dist/ReactCrop.css';

import React, { useEffect, useRef, useState } from 'react';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
  PercentCrop,
} from 'react-image-crop';
import { canvasPreview } from './component/canvasPreview';
import { Button, message } from 'antd';
import { useDebounceEffect } from './component/useDebounceEffect';

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

const socialMediaPictureSpecifications: {
  name: string;
  pictureSpecifications: {
    [pictureType: string]: {
      width: number;
      height: number;
      aspect: number;
    };
  };
}[] = [
  {
    name: 'xiaohongshu',
    pictureSpecifications: {
      profile: {
        width: 400,
        height: 400,
        aspect: 1,
      },
      cover_portrait: {
        width: 1242,
        height: 1660,
        aspect: 1242 / 1660,
      },
      cover_landscape: {
        width: 800,
        height: 600,
        aspect: 800 / 600,
      },
      background: {
        width: 1000,
        height: 800,
        aspect: 1000 / 800,
      },
      image_portrait: {
        width: 900,
        height: 1200,
        aspect: 900 / 1200,
      },
      image_square: {
        width: 1080,
        height: 1080,
        aspect: 1,
      },
      image_landscape: {
        width: 1200,
        height: 900,
        aspect: 1200 / 900,
      },
    },
  },
];

export const ProModeWindow_v4_tabPane_type_image_crop_v1 = () => {
  const [imgSrc, setImgSrc] = useState(
    // 'https://www.xiaokaup.com/assets/images/2023-10-19-img-1-cloudequivalentservices-vmscrub-30c1150f98a18ce3dd8a80369a9f3ba2.jpeg',
    '',
  );

  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const [scale, setScale] = useState(1); // 放大缩小
  const [rotate, setRotate] = useState(0); // 旋转图片
  const [aspect, setAspect] = useState<number | undefined>(16 / 9); // 截图部分是否按照比例
  const [outputMaxWidth, setOutputMaxWidth] = useState(800); // Set your max width
  const [outputMaxHeight, setOutputMaxHeight] = useState(400); // Set your max height

  // Buttons
  const blobUrlRef = useRef(''); // Blob URL for the crop
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null); // Hidden download anchor saving new blob URL to download

  useDebounceEffect(
    async () => {
      if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
        // We use canvasPreview as it's much faster than imgPreview.
        // Update previewCanvas
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate);
      }
    },
    100,
    [completedCrop, scale, rotate],
  );

  const onDownloadCropClick = async () => {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    console.log('onDownloadCropClick image', image);
    console.log('onDownloadCropClick previewCanvas', previewCanvas);
    console.log('onDownloadCropClick completedCrop', completedCrop);
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist');
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // === Resize image - start ===
    // Calculate the target width and height
    let targetWidth = completedCrop.width * scaleX;
    let targetHeight = completedCrop.height * scaleY;

    // Calculate the ratio
    const widthRatio = targetWidth / outputMaxWidth;
    const heightRatio = targetHeight / outputMaxHeight;
    const maxRatio = Math.max(widthRatio, heightRatio);

    // If the image is larger than max dimensions, scale it down
    if (maxRatio > 1) {
      targetWidth /= maxRatio;
      targetHeight /= maxRatio;
    }
    // === Resize image - end ===

    // const offscreen = new OffscreenCanvas(completedCrop.width * scaleX, completedCrop.height * scaleY);
    const offscreen = new OffscreenCanvas(targetWidth, targetHeight);
    const ctx = offscreen.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
    }

    // Draw the image resized
    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    );
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: 'image/png',
    });

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    blobUrlRef.current = URL.createObjectURL(blob); // Generate a URL for the blob

    // Download image by blobUrlRef.current
    if (hiddenAnchorRef.current) {
      hiddenAnchorRef.current.href = blobUrlRef.current;
      hiddenAnchorRef.current.click();
    }
  };

  return (
    <div className="page_container" style={{ maxWidth: 'unset' }}>
      <div className="row crop-controls">
        <input
          type="file"
          accept="image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
              console.log('e.target.files', e.target.files);
              setCrop(undefined); // Makes crop preview update between images.
              const reader = new FileReader();
              reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
              reader.readAsDataURL(e.target.files[0]);
            }
          }}
        />
      </div>
      <div className="row original_image">
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => {
            setCompletedCrop(c);
          }}
        >
          <img
            ref={imgRef}
            src={imgSrc}
            style={{ maxWidth: 800 }}
            onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
              // 当图片加载完成后，如果 aspect 为 true 的话，按照比例显示截图，并将截图截图部分设置为中心位置
              if (aspect) {
                const { width, height } = e.currentTarget;
                setCrop(centerAspectCrop(width, height, aspect));
              }
            }}
          />
        </ReactCrop>
      </div>

      {!!completedCrop && (
        <div className="row preview_image">
          <canvas
            ref={previewCanvasRef}
            style={{
              border: '1px solid black',
              objectFit: 'contain',
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        </div>
      )}

      <div className="buttons">
        <div className="row button_download">
          <Button type="primary" onClick={onDownloadCropClick}>
            Download
          </Button>
          <a
            href="#hidden"
            ref={hiddenAnchorRef}
            download
            style={{
              position: 'absolute',
              top: '-200vh',
              visibility: 'hidden',
            }}
          >
            Hidden download
          </a>
        </div>
        {/* <div className="row buttons_for_test hidden">
          <Button
            type="primary"
            onClick={() => {
              console.log('crop', crop);
              console.log('completedCrop', completedCrop);
              console.log('imgRef.current', imgRef.current);
              console.log('previewCanvasRef.current', previewCanvasRef.current);
            }}
          >
            test
          </Button>
        </div> */}
      </div>
    </div>
  );
};
