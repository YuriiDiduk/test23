import { getMessagesAction } from "actions/messagingActions";
import { Search } from "components/common/Search/Search";
import { Sorting } from "components/common/Sorting/Sorting";
import { TableCustom } from "components/common/TableCustom/TableCustom";
import { TableRoom } from "components/common/TableCustom/TableRoom";
import { Header } from "components/layouts/Header/Header";
import { PageHeader } from "components/layouts/PageHeader/PageHeader";
import { messagesColumns, RESET_MESSAGE_ROOM } from "const";
import { BreakpointsContext } from "context/BreakpointsContext";
import { makeSelector } from "helpers";
import { useModal } from "hooks/useModal";
import { Page, SORT_BY } from "interfaces";
import { IProfile, Roles } from "interfaces/profile";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  IMessagingReducerState,
  IMessagesList,
} from "store/reducers/messagingReducer";
import { IProfileReducerState } from "store/reducers/profileReducer";
import { MessagingRoom } from "./MessagingRoom";
import { ModalGeneralMessage } from "./ModalGeneralMessage";

const Messaging = () => {
  const { messages, count } = useSelector<
    IMessagingReducerState,
    IMessagesList
  >(makeSelector(["messagingReducer", "messagesList"]));

  const { roles, email } = useSelector<IProfileReducerState, IProfile>(
    makeSelector(["profileReducer", "profile"])
  );

  const { isDesktop } = React.useContext(BreakpointsContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAdmin = roles[0] === Roles.admin || roles[0] === Roles.superAdmin;

  const columns = messagesColumns;
  const { isOpen, openModal, closeModal } = useModal("addGeneralMessage");

  const handleOpenRoom = (id: string) => {
    navigate(`${id}`);
  };

  const handleCloseRoom = () => {
    navigate(-1);
    dispatch({ type: RESET_MESSAGE_ROOM });
  };

  const renderRoom = () => {
    return (
      <TableRoom handleClose={handleCloseRoom}>
        <MessagingRoom roles={roles} senderEmail={email} />
      </TableRoom>
    );
  };

  return (
    <>
      <Header>
        <Search />
      </Header>
      <div className="container">
        <PageHeader
          title={isDesktop ? "Patient Messaging" : "Messaging"}
          textBtn="General Message"
          handleClickBtn={openModal}
          isAccessibleAdd={isAdmin}
          isTableVirtualized
          page={Page.messaging}
        >
          <Sorting sortDefault={SORT_BY.latest} />
        </PageHeader>
        <TableCustom
          isTableVirtualized
          columns={columns}
          rows={messages}
          rowsCount={count}
          getRowsAction={getMessagesAction}
          isAvatarExist={true}
          roles={roles}
          isStriped={false}
          page={Page.messaging}
          handleOpenRoom={handleOpenRoom}
          rowHeight={80}
        />
      </div>
      <ModalGeneralMessage
        isOpen={isOpen}
        handleClose={closeModal}
        senderEmail={email}
      />
      <Routes>
        <Route path=":id" element={renderRoom()} />
      </Routes>
    </>
  );
};

export default Messaging;
