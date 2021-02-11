import React from 'react'

import styles from './Login.scss'

const LoginEntity = () => {
	return <div className={styles.container}>
        <div className={styles.leftSide}>
            <h1>
                Une idée ?
            </h1>
            <h2>
                Développons-la.
            </h2>
        </div>
        <div className={styles.rightSide}></div>
    </div>
}

export default LoginEntity