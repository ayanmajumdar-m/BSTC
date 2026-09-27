import { NativeModule, requireNativeModule } from 'expo';

declare class BstcWalletModule extends NativeModule<{}> {}

export default requireNativeModule<BstcWalletModule>('BstcWallet');