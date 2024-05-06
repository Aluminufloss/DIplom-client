import { ITask } from "@/api/models/Response/Tasks/ITask";

export const compareModalParamsWithInitial = (
  newTaskInfo: ITask,
  initialParams: ITask
) => {
  const isTitlesEqual = newTaskInfo.title === initialParams.title;
  const isDescriptionsEqual = newTaskInfo.description === initialParams.description;
  const isCategoriesEqual = newTaskInfo.category === initialParams.category;
  const isPrioritiesEqual = newTaskInfo.priority === initialParams.priority;
  const isListsEqual = newTaskInfo.listId === initialParams.listId;

  const isRepeatDaysEqual = newTaskInfo.repeatDays.some((item, index) => {
    return item.isSelected !== initialParams.repeatDays[index].isSelected;
  });

  return (
    isTitlesEqual &&
    isDescriptionsEqual &&
    isCategoriesEqual &&
    isPrioritiesEqual &&
    !isRepeatDaysEqual &&
    isListsEqual
  );
}