const MessageBrokerOptions = {
  queues: {
    info: "logInfo",
    error: "logError"
  }
} as const;

export { MessageBrokerOptions };
