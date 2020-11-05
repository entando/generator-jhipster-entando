export const publishWidgetEvent = (eventType, payload) => {
  const widgetEvent = new CustomEvent(eventType, {
    detail: {
      payload,
    },
  });
  window.dispatchEvent(widgetEvent);
};

export const createWidgetEventPublisher = eventType => payload =>
  publishWidgetEvent(eventType, payload);

export const subscribeToWidgetEvent = (eventType, eventHandler) => {
  window.addEventListener(eventType, eventHandler);

  return () => {
    window.removeEventListener(eventType, eventHandler);
  };
};

export const subscribeToWidgetEvents = (widgetEvents, eventHandler) => {
  widgetEvents.forEach(eventType => window.addEventListener(eventType, eventHandler));

  return () => {
    widgetEvents.forEach(eventType => window.removeEventListener(eventType, eventHandler));
  };
};

export const widgetEventToFSA = widgetEvent => {
  // for info about Flux Standard Action (FSA) see https://github.com/redux-utilities/flux-standard-action
  const {
    type,
    detail: { payload, error, meta },
  } = widgetEvent;
  return { type, payload, error, meta };
};
