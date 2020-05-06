import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { rootReducer } from './reducer'

const persistConfig = {
  key: 'homework',
  storage,
  blacklist: ['user.rememberMe'],
}

const isTest = process.env.NODE_ENV === 'test'

const middlewares = isTest ? undefined : applyMiddleware(logger)

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, middlewares)

export const persistor = persistStore(store)
