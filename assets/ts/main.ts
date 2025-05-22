/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
	type Theme = 'auto' | 'light' | 'dark';

	function getStoredTheme(): Theme | null {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme === 'auto' || savedTheme === 'light' || savedTheme === 'dark') {
			return savedTheme as Theme;
		}

		return null;
	}

	function setStoredTheme(theme: Theme) {
		localStorage.setItem('theme', theme);
	}

	function getPreferredTheme(): Theme {
		var storedTheme = getStoredTheme();
		if (storedTheme) {
			return storedTheme;
		}

		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	function setTheme(theme: Theme): void {
		if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.setAttribute('data-bs-theme', 'dark');
		} else {
			document.documentElement.setAttribute('data-bs-theme', theme);
		}
	}

	setTheme(getPreferredTheme());

	function showActiveTheme(theme: Theme, focus: boolean = false) {
		const themeSwitcher = document.querySelector('#bd-theme') as HTMLElement;
		if (!themeSwitcher) {
			return;
		}

		const themeSwitcherText = document.querySelector('#bd-theme-text') as HTMLElement;
		const activeThemeIcon = document.querySelector('#theme-icon-active') as HTMLElement;
		const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`) as HTMLElement;
		const classNameOfActiveIcon = btnToActive.dataset.bsThemeIcon;

		document.querySelectorAll('[data-bs-theme-value]').forEach((element) => {
			element.classList.remove('active');
			element.setAttribute('aria-pressed', 'false');
		});

		btnToActive.classList.add('active');
		btnToActive.setAttribute('aria-pressed', 'true');
		activeThemeIcon.className = classNameOfActiveIcon;

		const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
		themeSwitcher.setAttribute('aria-label', themeSwitcherLabel);

		if (focus) {
			themeSwitcher.focus();
		}
	}

	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
		var storedTheme = getStoredTheme();
		if (storedTheme !== 'light' && storedTheme !== 'dark') {
			setTheme(getPreferredTheme());
		}
	});

	window.addEventListener('DOMContentLoaded', () => {
		showActiveTheme(getPreferredTheme());

		document.querySelectorAll('[data-bs-theme-value]')
			.forEach(toggle => {
				toggle.addEventListener('click', () => {
					var theme = toggle.getAttribute('data-bs-theme-value') as Theme;
					setStoredTheme(theme);
					setTheme(theme);
					showActiveTheme(theme, true);
				});
			});
	});
})();


// Font chooser
(() => {
	type Font = string;

	function getStoredFont(): Font | null {
		return localStorage.getItem('font');
	}

	function setStoredFont(font: Font): void {
		localStorage.setItem('font', font);
	}

	function setFont(font: Font) {
		if (font) {
			document.documentElement.style.setProperty('--article-font', font);
		}
	}

	setFont(getStoredFont());

	function showActiveFont(font: Font, focus: boolean = false) {
		if (!font) {
			return;
		}

		const fontSwitcher = document.querySelector('#bd-font') as HTMLElement;
		if (!fontSwitcher) {
			return;
		}

		const fontSwitcherText = document.querySelector('#bd-font-text') as HTMLElement;
		const btnToActive = document.querySelector(`[data-font-value="${font}"]`) as HTMLElement;

		document.querySelectorAll('[data-font-value]').forEach((element) => {
			element.classList.remove('active');
			element.setAttribute('aria-pressed', 'false');
		});

		btnToActive.classList.add('active');
		btnToActive.setAttribute('aria-pressed', 'true');
		const fontSwitcherLabel = `${fontSwitcherText.textContent} (${btnToActive.dataset.fontValue})`;
		fontSwitcher.setAttribute('aria-label', fontSwitcherLabel);

		if (focus) {
			fontSwitcher.focus();
		}
	}

	window.addEventListener('DOMContentLoaded', () => {
		showActiveFont(getStoredFont());

		document.querySelectorAll('[data-font-value]')
			.forEach((toggle) => {
				toggle.addEventListener('click', () => {
					const font = toggle.getAttribute('data-font-value');
					setStoredFont(font);
					setFont(font);
					showActiveFont(font, true);
				});
			});
	});
})();
