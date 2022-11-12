import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  RefObject,
} from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { convertImageBlobToBase64 } from 'helpers';
import { useModal } from 'hooks/useModal';
import { ModalWindow } from '../Modal/ModalWindow';
import { Button } from '../Button/Button';
import { Icon } from '../Icon';
import s from "./Upload.module.scss";
import cn from "classnames";

interface IUploadAvatar {
  value?: Blob | string | null;
  name: string;
  onChange: (image: Blob) => void;
  handlerBlur?: (name: string) => void;
  isProfile?: boolean;
  removeAvatar?(): void;
}

const pixelRatio = window.devicePixelRatio || 1;

function getResizedCanvas(
  canvas: HTMLCanvasElement,
  newWidth: number,
  newHeight: number,
) {
  const tmpCanvas = document.createElement('canvas');
  tmpCanvas.width = newWidth;
  tmpCanvas.height = newHeight;

  const ctx = tmpCanvas.getContext('2d');
  ctx?.drawImage(
    canvas,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    newWidth,
    newHeight,
  );

  return tmpCanvas;
}

function generateBlob(previewCanvas: any, crop: HTMLCanvasElement) {
  if (!crop || !previewCanvas) {
    return;
  }
  const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);
  return new Promise<Blob>((resolve) => {
    canvas.toBlob((blob: any) => {
      if (!blob) {
        console.error('Canvas is empty');
        return;
      }
      blob.filename = 'newFile.png';
      blob.name = 'newFile.png';

      resolve(blob);
    }, 'image/png');
  });
}

const toBase64 = async (
  previewCanvasRef: RefObject<HTMLCanvasElement>,
  completedCrop: HTMLCanvasElement,
) => {
  const blob = await generateBlob(previewCanvasRef.current, completedCrop);
  if (blob) {
    const base64 = await convertImageBlobToBase64(blob);
    return base64;
  }
};

export const UploadAvatar = (props: IUploadAvatar) => {
  const [upImg, setUpImg] = useState<any>();
  const [imgRef, setImageRef] = useState<any>('');
  const previewCanvasRef = useRef<any>(null);
  const [crop, setCrop] = useState<any>({
    aspect: 6 / 6,
    unit: 'px',
    width: 214,
    height: 214,
    x: 5,
    y: 10,
  });

  const [completedCrop, setCompletedCrop] = useState<any>(null);

  const {
    onChange,
    value,
    handlerBlur,
    name,
    isProfile = false,
    removeAvatar,
  } = props;

  const { isOpen, openModal, closeModal } = useModal("upload");

  const onSelectFile = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      openModal();
    }
  };

  const btnHandler = async () => {
    const result = await generateBlob(previewCanvasRef.current, completedCrop);
    if (result) {
      onChange(result);
    }
    closeModal();
  };

  const onLoad = useCallback((img) => {
    setImageRef(img);
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef) {
      return;
    }

    const image = imgRef;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image?.naturalWidth / image.width;
    const scaleY = image?.naturalHeight / image.height;
    const ctx = canvas?.getContext('2d');

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
  }, [completedCrop]);

  const renderProfileUploadWithoutAvatar = () => {
    return (
      <>
        <label htmlFor="file" className={s.labelWrapper}>
          <span className={s.imageWrapper}>
            <Icon icon="user" className={s.defaultIcon} />
          </span>
          <span className={s.label}>
            <Icon icon="upload" className={s.iconLabel} />
            <span className={s.labelText}>Upload Photo</span>
          </span>
        </label>
      </>
    );
  };

  const renderProfileUploadWithAvatar = () => {
    return (
      <>
        <div className={s.removeBtn} onClick={removeAvatar}>
          <div className={s.imageWrapper}>
            {value &&
              <img
                src={typeof value === "string" ? value : URL.createObjectURL(value)}
                alt="Avatar"
                className={`${value && "uploaded-image"}`}
              />
            }
          </div>
          <Icon icon="trash" className={s.trash} />
        </div>
        <label htmlFor="file" className={s.label}>
          <Icon icon="upload" className={s.iconLabel} />
          <span className={s.labelText}>Upload Photo</span>
        </label>
      </>
    );
  }

  const renderSmallUpload = () => {
    return (
      <label htmlFor="file">
        <div className={s.imageWrapper}>
          {value ? (
            <img
              src={typeof value === "string" ? value : URL.createObjectURL(value)}
              alt="Avatar"
              className={`${value && "uploaded-image"}`}
            />
          ) : (
            <Icon icon="user" className={s.defaultIcon} />
          )}
          <Icon icon="upload" className={s.overlay} />
        </div>
      </label>
    );
  }
  
  return (
    <div className={s.wrapper}>
      <div className={cn(s.uploadBtn, isProfile && s.large)}>
        {isProfile
          ? (value 
              ? renderProfileUploadWithAvatar()
              : renderProfileUploadWithoutAvatar()
            )
          : renderSmallUpload()}
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          onBlur={handlerBlur ? () => handlerBlur(name) : undefined}
          className={s.inputFile}
          id="file"
        />
      </div>

      <ModalWindow
        isOpen={isOpen}
        title="Upload photo"
        handleClose={closeModal}
        className="category-editor-modal"
        size="middle"
      >
        <div className={s.cropperWrapper}>
          <ReactCrop
            circularCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          />
          <div className={s.cropperSave}>
            <Button onClick={btnHandler} value="Save" size="long" />
          </div>
        </div>
      </ModalWindow>
      <div style={{ opacity: 0, position: "absolute", zIndex: -1 }}>
        <canvas
          className={s.canvas}
          ref={previewCanvasRef}
          style={{
            width: 90,
            height: 90,
            maxWidth: 90,
            maxHeight: 90,
          }}
        />
      </div>
    </div>
  );
};
