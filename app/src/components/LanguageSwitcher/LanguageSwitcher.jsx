import React, { useState, useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'
  
import i18next from 'i18next'

import styles from './LanguageSwitcher.scss'

const LanguageSwitcher = (props) => {
    const { i18n, t } = props

    const changeLanguage = nextLang => {
        i18n.changeLanguage(nextLang)
    }

    const handleClickSelectLanguage = (event, nextLang) => {
        i18n.changeLanguage(nextLang)
    }

    return <React.Fragment>
        <button
            type="button"
            className={styles.switcher}
            onClick={event => handleClickSelectLanguage(event, i18next.language === 'fr' ? 'en' : 'fr')}
        >
            {i18next.language}
        </button>
    </React.Fragment>
}

export default withRouter(withTranslation()(LanguageSwitcher))