import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

import { global } from '@modules/ui/images'

import styles from './Loading.scss'

const LoadingEntity = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(!isLoading)
        }, 4000)
    }, [])

	return <div className={classNames(styles.loading, !isLoading ? styles.hide : null)}>
        <img src={global.chevron.default} alt="loading" />
    </div>
}

export default LoadingEntity
