'use client'

import React, { useEffect } from 'react';

//Redux
import {store} from '@/redux/store'
import {Provider} from 'react-redux'
import { actions as customerActions } from '@/redux/reducers/customerReducer'

// Функция для проверки валидности JWT токена
const isJWTValid = (jwt) => {
  if (!jwt) return false;
  
  try {
    // Декодируем JWT токен (без проверки подписи)
    const payload = JSON.parse(atob(jwt.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Проверяем, не истек ли токен
    if (payload.exp && payload.exp < currentTime) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Ошибка при проверке JWT токена:', error);
    return false;
  }
};

export const ReduxWrapper = ({children}) => {
  useEffect(() => {
    // Инициализация данных пользователя из localStorage при загрузке приложения
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('userData');
      if (userData) {
        try {
          const parsedUserData = JSON.parse(userData);
          // Проверяем, что JWT токен валиден
          if (parsedUserData.JWT && isJWTValid(parsedUserData.JWT)) {
            store.dispatch(customerActions.initializeFromStorage(parsedUserData));
          } else {
            // Если токен невалиден, удаляем данные
            localStorage.removeItem('userData');
          }
        } catch (error) {
          console.error('Ошибка при парсинге данных пользователя:', error);
          localStorage.removeItem('userData');
        }
      }
    }
  }, []);

  return(
    <Provider store = {store}>
      {children}
    </Provider>
  )
}
