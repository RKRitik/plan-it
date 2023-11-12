import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { handleSignIn } from '../../helpers/authHelpers';

export default function SignIn() {
  return (
    <View className="flex h-full justify-center">
      <Button icon="google" onPress={handleSignIn}>
        Google Sign In
      </Button>
    </View>
  );
}
