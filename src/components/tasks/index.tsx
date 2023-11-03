import { Button, Text, View } from 'react-native';

type Props = { route: any; navigation: any };

export default function Tasks({ route, navigation }: any) {
  return (
    <View>
      <Text className="text-black text-[22px]">Tasks</Text>
      <Button
        title="Add Task"
        onPress={() => navigation.navigate('TaskView')}
      />
    </View>
  );
}
