import { configureStore } from '@reduxjs/toolkit';

import tabbedView from './slices/TabbedView';


export const store =  configureStore({
  reducer: {
		tabbedView,
	}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;