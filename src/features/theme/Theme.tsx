import React, { useEffect } from 'react'
// import { IoIosSunny, IoIosMoon } from 'react-icons/io';
// import { IoIosSunny, IoIosMoon, IoIosDesktop } from 'react-icons/io';
import { setDarkTheme, setLightTheme } from './themeSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks/storeHooks'

const Theme: React.FC = () => {
  const theme = useAppSelector(state => state.theme.currentTheme)
  const element = document.documentElement
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const dispatch = useAppDispatch()

  const onWindowMatch = () => {
    if (theme === "dark" && darkQuery.matches) {
      dispatch(setDarkTheme())
    } else {
      dispatch(setLightTheme())
    }
  }

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add('dark');
        break;
      case "light":
        element.classList.remove('dark');
        break;
      default:
        element.classList.remove('dark');
        onWindowMatch()
        break;
    }
  }, [theme])


  return (
    <></>
  )
}

export default Theme