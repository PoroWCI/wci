import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import LanguageSwitcher from '@components/LanguageSwitcher'

import { global } from '@modules/ui/images'

import styles from './Login.scss'

const LoginEntity = () => {
    const myRef = useRef(null)
    const [t, i18n] = useTranslation()

    const scrollDown = () => myRef.current.scrollIntoView()    

	return <div className={styles.container}>
        <div className={styles.leftSide}>
            <h1>{t('login.title-1')}</h1>
            <h2>{t('login.title-2')}</h2>
            <img 
                className={styles.seeMore}
                onClick={scrollDown}
                src={global.ArrowDown.default} 
                alt="See more"
            />
        </div>
        <div ref={myRef} className={styles.rightSide}>
            <div className={styles.translate}>
                <LanguageSwitcher />
            </div>
        </div>
    </div>
}

export default LoginEntity