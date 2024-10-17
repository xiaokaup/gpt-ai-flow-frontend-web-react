import { useState } from 'react';
import { Image as AntdImage, UploadFile, UploadProps, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getBase64, FileType } from '../tools/TImage';

// const uploadFileList_for_test = [
//   {
//     uid: '-1',
//     name: 'image.png',
//     status: 'done',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   },
//   {
//     uid: '-2',
//     name: 'image.png',
//     status: 'done',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   },
//   {
//     uid: '-3',
//     name: 'image.png',
//     status: 'done',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   },
//   {
//     uid: '-4',
//     name: 'image.png',
//     status: 'done',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   },
//   {
//     uid: '-xxx',
//     percent: 50,
//     name: 'image.png',
//     status: 'uploading',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   },
//   {
//     uid: '-5',
//     name: 'image.png',
//     status: 'error',
//   },
// ];

interface ILangchain_right_02_uploader_input {
  uploadFileList: UploadFile[];
  setUploadFileList: (newFileList: UploadFile[]) => void;
}
export const Langchain_right_02_uploader = (props: ILangchain_right_02_uploader_input) => {
  const { uploadFileList, setUploadFileList } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setUploadFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  function resizeImage(
    file: File,
    maxWidth: number,
    maxHeight: number,
    quality: number,
    callback: (file: File) => void,
  ) {
    // const maxWidth = 512;
    // const maxHeight = 512;
    // const quality = 0.8; // Adjust quality from 0 to 1
    // High Quality (0.8 to 1.0)
    // Medium Quality (0.5 to 0.79)
    // Low Quality (0.1 to 0.49)

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      // console.log('resizeImage event.target.result:', event.target.result);
      img.src = event.target.result as string;
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        const shouldResize = width > maxWidth || height > maxHeight;

        if (!shouldResize) {
          callback(file);
          return;
        }

        let newWidth: number, newHeight: number;

        if (width > height) {
          newWidth = maxWidth;
          newHeight = (height * maxWidth) / width;
        } else {
          newWidth = (width * maxHeight) / height;
          newHeight = maxHeight;
        }

        // Check if the original size is smaller than the intended size
        newWidth = Math.min(width, newWidth);
        newHeight = Math.min(height, newHeight);

        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;

        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob(
          (blob) => {
            const resizedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            callback(resizedFile);
          },
          'image/jpeg',
          quality,
        );
      };
    };
  }

  return (
    <>
      <Upload
        // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        beforeUpload={(file) => {
          const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
          if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG files!');
            return Upload.LIST_IGNORE;
          }

          const isLt3M = file.size / 1024 / 1024 < 3;
          if (!isLt3M) {
            message.error('Image must smaller than 3MB!');
            return Upload.LIST_IGNORE;
          }

          // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
          return new Promise((resolve, reject) => {
            resizeImage(file, 512, 512, 0.8, (resizedFile) => {
              // console.log('resizedFile', resizedFile);
              resolve(resizedFile);
            });
          });
        }}
        customRequest={({ file, onSuccess }) => {
          console.log('customRequest file', file);
          setTimeout(() => {
            onSuccess('ok');
          }, 0);
        }}
        listType="picture-card"
        fileList={uploadFileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {uploadFileList.length >= 3 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <AntdImage
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};
