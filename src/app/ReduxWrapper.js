'use client'

import React from 'react';

//Redux
import {store} from '@/redux/store'
import {Provider} from 'react-redux'

export const ReduxWrapper = ({children}) => {

  return(
    <Provider store = {store}>
      {children}
    </Provider>
  )
}
