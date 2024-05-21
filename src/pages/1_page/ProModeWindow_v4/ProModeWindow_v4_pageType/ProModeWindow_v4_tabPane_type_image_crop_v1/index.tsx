import 'react-image-crop/dist/ReactCrop.css';

import React, { useRef, useState } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop, convertToPixelCrop } from 'react-image-crop';

export const ProModeWindow_v4_tabPane_type_image_crop_v1 = () => {
  const [crop, setCrop] = useState<Crop>();

  const [imgSrc, setImgSrc] = useState(
    'https://www.xiaokaup.com/assets/images/2023-10-19-img-1-cloudequivalentservices-vmscrub-30c1150f98a18ce3dd8a80369a9f3ba2.jpeg',
  );

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <div className="page_container" style={{ maxWidth: 'unset' }}>
      <div className="row">
        <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
          <img src={imgSrc} />
        </ReactCrop>
      </div>
    </div>
  );
};
