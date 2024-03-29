import { useEffect, useState } from 'preact/hooks';
import { useAnalytics } from '../../helpers/analytics';

export function DarkModeToggler() {
  const [mode, setMode] = useState<'light' | 'dark' | undefined>(() => {
    if ((import.meta as any).env.SSR) {
      return undefined;
    }

    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') as 'light' | 'dark' | undefined;
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  });
  const { sendEvent } = useAnalytics();

  useEffect(() => {
    const html = document.documentElement;

    if (mode === 'dark') {
      html.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      html.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [mode]);

  let rendered;
  let toggleLabel = 'dark';

  if (mode === 'light') {
    rendered = (
      <path
        fill="currentColor"
        d="M21.4,13.7C20.6,13.9,19.8,14,19,14c-5,0-9-4-9-9c0-0.8,0.1-1.6,0.3-2.4c0.1-0.3,0-0.7-0.3-1 c-0.3-0.3-0.6-0.4-1-0.3C4.3,2.7,1,7.1,1,12c0,6.1,4.9,11,11,11c4.9,0,9.3-3.3,10.6-8.1c0.1-0.3,0-0.7-0.3-1 C22.1,13.7,21.7,13.6,21.4,13.7z"
      ></path>
    );
  } else {
    toggleLabel = 'light';
    rendered = (
      <g stroke-width="2" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="5"></circle>
        <path d="M12 1v2"></path>
        <path d="M12 21v2"></path>
        <path d="M4.22 4.22l1.42 1.42"></path>
        <path d="M18.36 18.36l1.42 1.42"></path>
        <path d="M1 12h2"></path>
        <path d="M21 12h2"></path>
        <path d="M4.22 19.78l1.42-1.42"></path>
        <path d="M18.36 5.64l1.42-1.42"></path>
      </g>
    );
  }

  function onButtonClick() {
    const nextMode = localStorage.theme === 'dark' ? 'light' : 'dark';

    setMode(nextMode);
    sendEvent('toggle_dark_mode', { value: nextMode });
  }

  return (
    <button
      onClick={onButtonClick}
      className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full transition-colors"
      aria-label={`Toggle ${toggleLabel} mode`}
    >
      <svg
        viewBox="0 0 24 24"
        focusable="false"
        className="text-gray-500 dark:text-gray-200 h-6 w-6"
      >
        {rendered}
      </svg>
    </button>
  );
}
