// Stub event for local and development stuff.
function gtag(...args: any) {}

function stubEvent(_eventName: string, _eventDetail: any) {}
function realEvent(eventName: string, eventDetail: any) {
  gtag('event', eventName, eventDetail);
}

export function useAnalytics() {
  return {
    sendEvent:
      (import.meta as any).env.PUBLIC_VERCEL_ENV === 'production'
        ? realEvent
        : stubEvent
  };
}
