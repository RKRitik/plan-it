import { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { getUserInfo } from '../../helpers/authHelpers';

export default function SplashScreen() {
  useEffect(() => {
    (async () => {
      await getUserInfo();
    })();
  }, []);

  return (
    <View className="flex items-center h-full justify-center">
      <Text>Loading...</Text>
    </View>
  );
}
