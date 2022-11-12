import { Button } from "components/common/Button/Button";
import { Header } from "components/layouts/Header/Header";
import { PageHeader } from "components/layouts/PageHeader/PageHeader";
import { BreakpointsContext } from "context/BreakpointsContext";
import { makeSelector } from "helpers";
import { useModal } from "hooks/useModal";
import { IProfile, Roles } from "interfaces/profile";
import * as React from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { IProfileReducerState } from "store/reducers/profileReducer";
import { ModalAddFaq } from "./ModalAddFaq";
import s from "./HelpCentre.module.scss";
import { TableCustom } from "components/common/TableCustom/TableCustom";
import { faqColumns } from "const";
import { IFaqReducerState } from "store/reducers/faqReducer";
import {
  getFaqsAction,
  removeFaqAction,
  updateFaqAction,
} from "actions/faqActions";
import { IFaq, Page } from "interfaces";
import { ModalReport } from "./ModalReport";

type IProps = {};
const HelpCenter = (props: IProps) => {
  const { roles } = useSelector<IProfileReducerState, IProfile>(
    makeSelector(["profileReducer", "profile"])
  );
  const faqList = useSelector<IFaqReducerState, IFaq[]>(
    makeSelector(["faqReducer", "faqList"])
  );

  const isSuperAdmin = roles[0] === Roles.superAdmin;

  const { isDesktop } = useContext(BreakpointsContext);
  const { isOpen, openModal, closeModal } = useModal("addFaq");
  const {
    isOpen: isOpenReport,
    openModal: openReport,
    closeModal: closeReport,
  } = useModal("reportProblem");

  const renderPageHeader = () => {
    return (
      <PageHeader
        title="Help Centre"
        textBtn="Add Question"
        handleClickBtn={openModal}
        isAccessibleAdd={true}
      >
        {!isSuperAdmin ? (
          <Button
            icon="life-buoy"
            value={"Report a Problem"}
            filled="empty"
            iconColor={"warning"}
            onClick={openReport}
            className={s.report}
          />
        ) : (
          <></>
        )}
      </PageHeader>
    );
  };

  return (
    <>
      <Header>
        <>{isDesktop && renderPageHeader()}</>
      </Header>
      <div className="container">
        {!isDesktop && renderPageHeader()}
        <TableCustom
          columns={faqColumns}
          rows={faqList}
          getRowsAction={getFaqsAction}
          updateDataAction={updateFaqAction}
          removeRowAction={removeFaqAction}
          isAvatarExist={true}
          roles={roles}
          withHeading={false}
          isStriped={false}
          className="faq"
          itemName="question"
          page={Page.helpCentre}
        />
      </div>
      <ModalAddFaq isOpen={isOpen} handleClose={closeModal} />
      <ModalReport isOpen={isOpenReport} handleClose={closeReport} />
    </>
  );
};

export default HelpCenter;
