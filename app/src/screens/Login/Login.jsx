import React from 'react'
import { useTranslation } from 'react-i18next'

import LanguageSwitcher from '@components/LanguageSwitcher'

import styles from './Login.scss'

const LoginEntity = () => {
    const [t, i18n] = useTranslation()

	return <div className={styles.container}>
        <div className={styles.leftSide}>
            <h1>{t('login.title-1')}</h1>
            <h2>{t('login.title-2')}</h2>
        </div>
        <div className={styles.rightSide}>
            <div className={styles.translate}>
                <LanguageSwitcher />
            </div>
        </div>
    </div>
}

export default LoginEntity