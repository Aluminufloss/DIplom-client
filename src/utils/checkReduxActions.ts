import { UnknownAction } from "@reduxjs/toolkit";
import { FulfilledAction, PendingAction, RejectedAction } from "@/models";

export const isPendingAction = (
  action: UnknownAction
): action is PendingAction => {
  return typeof action.type === "string" && action.type.endsWith("/pending");
};

export const isFulfilledAction = (
  action: UnknownAction
): action is FulfilledAction => {
  return typeof action.type === "string" && action.type.endsWith("/fulfilled");
};

export const isRejectedAction = (
  action: UnknownAction
): action is RejectedAction => {
  return typeof action.type === "string" && action.type.endsWith("/rejected");
};
