import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './AuthReducer'
import GroupReducer from './GroupChatReducer'

export const store = configureStore({
    reducer: {
    Auth: AuthReducer,
    group:GroupReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch