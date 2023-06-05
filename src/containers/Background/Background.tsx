import { useAppSelector } from '../../app/hooks/storeHooks'
import './index.scss'

function Background() {
    const theme = useAppSelector(state => state.theme.currentTheme)
    const isDarkTheme = theme === 'dark'

    return (
        <div className={`h-screen ${isDarkTheme ? 'background' : ''} bg-gradient-to-r from-light_primary_bg to-light_secondary_bg ${isDarkTheme ? 'dark:from-dark_primary_bg dark:to-dark_secondary_bg' : ''}`}>
            {isDarkTheme && (
                <>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </>
            )}
        </div>
    )
}

export default Background
