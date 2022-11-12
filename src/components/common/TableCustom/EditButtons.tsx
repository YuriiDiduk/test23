import * as React from 'react';
import { Icon } from '../Icon';
import s from "./Table.module.scss";
import cn from 'classnames';
import LoadingDots from '../LoadingDots/LoadingDots';
import { UpdateTableContext } from 'context/UpdateTableContext';
import { Page } from 'interfaces';
import { Switcher } from '../Switcher/Switcher';

type Props = {
  isHover?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  isDirty?: boolean;
  className?: string;
  isTableVirtualized?: boolean;
  page?: Page;
  isActive?: boolean;
  handleSwitchClick?: () => void;
};

export const EditButtons = React.forwardRef<HTMLDivElement, any>((props: Props, ref) => {
  const {
    isHover = true,
    onEdit,
    onDelete,
    onCancel,
    isLoading,
    isDirty,
    className,
    isTableVirtualized,
    page,
    isActive,
    handleSwitchClick,
  } = props;

  const { isUpdating } = React.useContext(UpdateTableContext);

  const firstBtnHoverRender = () => {
    return (page === Page.patients && isActive) || page !== Page.patients ? (
      <button
        className={s.editBtn}
        onClick={onEdit}
        disabled={isTableVirtualized && Boolean(isUpdating)}
      >
        <Icon icon="edit" />
      </button>
    ) : (
      handleSwitchClick &&
        <Switcher
          isActive={Boolean(isActive)}
          disabled={isUpdating}
          handleClick={handleSwitchClick}
        />
    );
  };

  const firstBtnEditRender = () => {
    return (
      <button
        type={"submit"}
        className={cn(s.editBtn, s.submit)}
        disabled={!isDirty}
      >
        <Icon icon="save" />
      </button>
    );
  };

  const firstBtnRender = () => {
    return <>{isHover ? firstBtnHoverRender() : firstBtnEditRender()}</>;
  };

  const secondBtnHoverRender = () => {
    return (page === Page.patients && !isActive) || page !== Page.patients ? (
      <button
        className={s.editBtn}
        onClick={onDelete}
        disabled={isTableVirtualized && Boolean(isUpdating)}
      >
        <Icon icon="trash" />
      </button>
    ) : (
      handleSwitchClick && (
        <Switcher
          isActive={Boolean(isActive)}
          disabled={isUpdating}
          handleClick={handleSwitchClick}
        />
      )
    );
  };

  const secondBtnEditRender = () => {
    return (
      <button className={s.editBtn} onClick={onCancel}>
        <Icon icon="close" />
      </button>
    );
  };

  const secondBtnRender = () => {
    return <>{isHover ? secondBtnHoverRender() : secondBtnEditRender()}</>;
  };

  return (
    <div
      className={cn(
        s.editButtons,
        s.edit,
        !isHover && isLoading && s.loading,
        className && s[className]
      )}
      ref={ref}
    >
      {!isHover && isLoading ? (
        <LoadingDots isLight={true} />
      ) : (
        <>
          {firstBtnRender()}
          {secondBtnRender()}
        </>
      )}
    </div>
  );
});