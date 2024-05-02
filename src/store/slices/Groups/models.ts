import { GroupType } from "@/models"

export type GroupStoreType = {
  isLoading: boolean
  groups: GroupType[],
}