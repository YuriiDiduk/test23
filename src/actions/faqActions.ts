import { GET_FAQS, CREATE_FAQ, REMOVE_FAQ, UPDATE_FAQ, CREATE_REPORT } from "const/actionTypes/faqTypes";
import { IActionFn, IReportCreate } from "interfaces";
import { QueryParams } from "interfaces";
import { IFaqCreate, IFaqUpdate } from "interfaces";

export const getFaqsAction: IActionFn<QueryParams | null> = (
  payload,
  params
) => ({
  payload,
  params,
  type: GET_FAQS.PENDING,
});

export const createFaqAction: IActionFn<IFaqCreate> = (
  payload,
  params
) => ({
  payload,
  params,
  type: CREATE_FAQ.PENDING,
});

export const removeFaqAction: IActionFn<string> = (payload, params) => ({
  payload,
  params,
  type: REMOVE_FAQ.PENDING,
});

export const updateFaqAction: IActionFn<IFaqUpdate> = (
  payload,
  params
) => ({
  payload,
  params,
  type: UPDATE_FAQ.PENDING,
});

export const createReportAction: IActionFn<IReportCreate> = (payload, params) => ({
  payload,
  params,
  type: CREATE_REPORT.PENDING,
});
