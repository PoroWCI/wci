import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'

import styles from './Cookies.scss'

const Cookies = ({ setCookie, sendStatus }) => {
    const [status, setStatus] = useState(false)
    const [t, i18n] = useTranslation()

    useEffect(() => {
        document.addEventListener("keydown", handleInput, false)

        return () => {
            document.removeEventListener("keydown", handleInput, false)
        }
    }, [])

    const handleInput = (event, fromKey = true, value) => {
        if (fromKey) {
            if (event.keyCode === 65)
            setCookie('privacy', true, { maxAge: 3600 * 24 * 7 })
            
            if (event.keyCode === 82)
                setCookie('privacy', false, { maxAge: 3600 * 24 * 7 })

            if (event.keyCode === 67)
                return null
        } else {
            setCookie('privacy', value, { maxAge: 3600 * 24 * 7 })
        }

        setTimeout(() => {
            sendStatus(true)
        }, 500)

        setStatus(true)
    }

    return <div className={classnames(styles.cookies, status ? styles.hide : null)}>
        <p>{t('cookies.privacy')}</p>
        <div className={styles.inputs}>
            <button onClick={(event) => handleInput(event, false, true)}>
                {t('cookies.accept')}
            </button>
            <button onClick={(event) => handleInput(event, false, false)}>
                {t('cookies.refuse')}
            </button>
            <button>
                {t('cookies.custom')}
            </button>
        </div>
    </div>
}

export default Cookies