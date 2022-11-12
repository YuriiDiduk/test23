import * as React from 'react';
import s from "./Patients.module.scss";
import cn from "classnames";
import { Avatar } from 'components/common/Avatar/Avatar';
import { Button } from 'components/common/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { usePrevious } from 'hooks/usePrevious';
import { useEffect } from 'react';
import { MessagingRoute } from 'const/routes';
import { getPatientRoomAction, getPatientRoomMessagingAction, getPatientRoomPhotoAction } from 'actions/patientsActions';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelector } from 'helpers';
import { IPatientsReducerState } from 'store/reducers/patientsReducer';
import { IPatientRoom, IPatientRoomMessagingInfo } from 'interfaces';
import { BreakpointsContext } from 'context/BreakpointsContext';
import { RESET_PATIENT_ROOM } from 'const';

export const PatientRoom = () => {
  const { isActive, fullName, age, photo } = useSelector<IPatientsReducerState, IPatientRoom>(
    makeSelector(["patientsReducer", "patientRoom"])
  );

  const { roomId, isRead } = useSelector<
    IPatientsReducerState,
    IPatientRoomMessagingInfo
  >(makeSelector(["patientsReducer", "messagingInfoInRoom"]));

  const photoInRoom = useSelector<IPatientsReducerState, string>(
    makeSelector(["patientsReducer", "photoInRoom"])
  );

  const { isMobile } = React.useContext(BreakpointsContext);

  const { id } = useParams();
  const prevId = usePrevious(id);
  const prevPhoto = usePrevious(photo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_PATIENT_ROOM });
    }
  }, []);

  useEffect(() => {
    if (!prevId && id) {
      dispatch(getPatientRoomAction(id));
      dispatch(getPatientRoomMessagingAction(id));
    }
  }, [id]);

  useEffect(() => {
    if (!prevPhoto && photo) {
      dispatch(getPatientRoomPhotoAction(photo.uuid));
    }
  }, [photo]);
  

  const handleClick = () => {
    navigate(`/${MessagingRoute}/${roomId}`);
  }

  return (
    <>
      {fullName && (
        <div className={cn(s.bgBlock, "bg-block")}>
          <div className={s.infoBlock}>
            <div className={cn(s.roomAvatar, isActive && s.active)}>
              <Avatar avatar={photoInRoom} size={isMobile ? 60 : 100} />
            </div>
            <div className={s.info}>
              <span className={cn(s.name, "h2")}>{fullName}</span>
              <span className={s.data}>{`${age} y.o.`}</span>
            </div>
            {roomId &&
              <Button
                value="Chat"
                icon="message-circle"
                className={cn(s.chatBtn, isRead && s.read)}
                onClick={handleClick}
              />
            }
          </div>
        </div>
      )}
    </>
  );
};