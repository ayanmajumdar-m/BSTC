import { registerWebModule, NativeModule } from 'expo';

class BstcWalletModule extends NativeModule<{}> {}

export default registerWebModule(BstcWalletModule, 'BstcWalletModule');
