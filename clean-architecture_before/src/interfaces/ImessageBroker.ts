export interface IMessageBroker {
    NotifyToPromotionService(product: unknown): boolean;
  }