import { Icon } from 'components/common/Icon';
import { Weaken } from 'interfaces';
import { IFormInput } from 'interfaces/form';
import React from 'react';
import s from "./InputFile.module.scss";

interface IFormInputFileProps extends Weaken<IFormInput, 'value'> {
  multiple?: boolean;
}

export const FormInputFile = React.forwardRef<
  HTMLInputElement,
  IFormInputFileProps
>((props, ref) => {
  const {
    multiple,
    onChange,
    value = [],
    ...rest
  } = props;

  const handleAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = [...value];

    if (event.target.files) {
      const files = [...event.target.files];

      const notDuplicatedFiles = files.filter((file) => {
        return !newValue.find((item) => {
          return (
            item.name === file.name && item.lastModified === file.lastModified
          );
        });
      });

      notDuplicatedFiles.forEach((file) => {
        newValue.push(file);
      });
    }

    onChange(newValue);
  };

  const handleRemove = (idx: number) => {
    const newValue = [...value];
    newValue.splice(idx, 1);
    onChange(newValue);
  };

  const renderFile = (file: File, i: number) => {
    return (
      <div className={s.file} key={i}>
        <span className={s.fileName}>{file.name}</span>
        <button
          className={s.fileRemove}
          type="button"
          onClick={handleRemove.bind(null, i)}
        >
          <Icon icon="close" className={s.iconClose}/>
        </button>
      </div>
    );
  };

  return (
    <div className={s.attach}>
      <div className={s.filesBox}>{value.map(renderFile)}</div>
      <label className={s.label}>
        <input
          {...rest}
          type="file"
          className={s.input}
          multiple={multiple}
          onChange={handleAdd}
          value=""
          ref={ref}
        />
        <span className={s.btnAttach}>
          <Icon icon="paperclip" className={s.attachIcon} />
          <span className={s.btnAttachText}>Attach</span>
        </span>
      </label>
    </div>
  );
});
