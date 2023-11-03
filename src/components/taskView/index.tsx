import { Button, Text, View } from 'react-native';

type Props = { route: any; navigation: any };
export default function TaskView({ route, navigation }: Props) {
  return (
    <View>
      <Text>Add/Edit Task</Text>
      <Button onPress={() => navigation.goBack()} title="back ?"></Button>
    </View>
  );
}
