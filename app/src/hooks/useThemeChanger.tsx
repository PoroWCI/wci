import React, { useState, useEffect } from 'react'

const ThemeChanger = () => {
	const [darkTheme, setDarkTheme] = useState(false)

	useEffect(() => {
		const getTheme = localStorage.getItem('Theme')
		if (getTheme === 'dark') return document.body.classList.add('dark-mode')
	}, [])

	const handleChange = () => {
		setDarkTheme(!darkTheme)
		if (darkTheme) {
			localStorage.setItem('Theme', 'dark')

			document.body.classList.add('dark-mode')
		} else {
			localStorage.setItem('Theme', 'light')

			if (document.body.classList.contains('dark-mode')) {
				document.body.classList.remove('dark-mode')
			}
		}
	}

	return null
}

export default ThemeChanger
