import 'react-image-crop/dist/ReactCrop.css';

import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop, convertToPixelCrop } from 'react-image-crop';

import { Button, TreeSelect } from 'antd';

import { IGetT_frontend_output } from '../../../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

import { canvasPreview } from './component/canvasPreview';
import { useDebounceEffect } from './component/useDebounceEffect';
import {
  transformData_for_treeSelect,
  socialMediaPictureSpecifications,
  treeSelectDefaultValue,
} from './component/TPictureSpecifications';

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

interface IProModeWindow_v4_tabPane_type_image_crop_v1 {
  t: IGetT_frontend_output;
}
export const ProModeWindow_v4_tabPane_type_image_crop_v1 = (props: IProModeWindow_v4_tabPane_type_image_crop_v1) => {
  const { t } = props;

  const [treeSelectedValue, setTreeSelectedValue] = useState<string>(treeSelectDefaultValue);
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

  useEffect(() => {
    if (imgRef.current && aspect) {
      const { width, height } = imgRef.current;
      const newCrop = centerAspectCrop(width, height, aspect);
      setCrop(newCrop);
      // Updates the preview
      setCompletedCrop(convertToPixelCrop(newCrop, width, height));
    }
  }, [aspect, treeSelectedValue]);

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
    // console.log('onDownloadCropClick image', image);
    // console.log('onDownloadCropClick previewCanvas', previewCanvas);
    // console.log('onDownloadCropClick completedCrop', completedCrop);
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
    const widthScale = outputMaxWidth / targetWidth;
    const heightScale = outputMaxHeight / targetHeight;
    const minScale = Math.min(widthScale, heightScale);

    if (minScale < 1) {
      // If the image is smaller than max dimensions, scale it up
      targetWidth *= minScale;
      targetHeight *= minScale;
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
      <div className="socialMediaPictureSpecifications">
        <TreeSelect
          showSearch
          style={{ width: '100%' }}
          value={treeSelectedValue}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
          onChange={(newValue: string) => {
            setTreeSelectedValue(newValue);

            const newValue_json: { type: string; height: number; width: number; aspect: number } = JSON.parse(newValue);
            // console.log('newValue_json', newValue_json);

            setOutputMaxHeight(newValue_json.height);
            setOutputMaxWidth(newValue_json.width);
            setAspect(newValue_json.aspect);
          }}
          treeData={transformData_for_treeSelect(t, socialMediaPictureSpecifications)}
          onPopupScroll={(e: SyntheticEvent) => {
            console.log('onPopupScroll', e);
          }}
        />
      </div>
      <div className="row crop-controls m-4">
        <input
          id="formFile"
          // className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white file:dark:text-white"
          className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-slate-300 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-slate-500 focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white file:dark:text-white"
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
      {imgSrc && (
        <div className="row original_image">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => {
              setCompletedCrop(c);
            }}
            aspect={aspect}
          >
            <img
              alt="Crop preview"
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
      )}

      {imgSrc && !!completedCrop && (completedCrop.width !== 0 || completedCrop.height !== 0) && (
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
            {t.get('Download')}
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
        {/* <div className="row buttons_for_test">
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
