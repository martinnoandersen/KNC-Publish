declare module "web-push" {
  type Keys = { publicKey: string; privateKey: string };
  type Subscription = { endpoint: string; keys: { p256dh: string; auth: string } };
  const webpush: {
    generateVAPIDKeys: () => Keys;
    setVapidDetails: (subject: string, publicKey: string, privateKey: string) => void;
    sendNotification: (subscription: Subscription, payload: string) => Promise<unknown>;
  };
  export default webpush;
}
