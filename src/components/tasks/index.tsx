import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { taskDataType, defaultValues } from '../addTask';
import { Button, Card } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/store';
import { handleSignOut } from '../../helpers/authHelpers';

type Props = { route: any; navigation: any };

export default function Tasks({ route, navigation }: Props) {
  const tasks = useSelector((state: RootState) => state.tasksReducer.tasks);

  function task(taskData_: taskDataType) {
    return (
      <Card
        mode="contained"
        className="mb-4 "
        key={taskData_._id + ''}
        onPress={() => gotoTask(taskData_)}>
        {/*TODO: hamburger Menu*/}
        {taskData_.attachments?.img && (
          <Card.Cover
            resizeMode="center"
            source={{ uri: taskData_.attachments?.img }}
          />
        )}
        <Card.Title title={taskData_.name} />
        {taskData_.description && (
          <Card.Content>
            <Text>{taskData_.description}</Text>
          </Card.Content>
        )}
      </Card>
    );
  }

  function gotoTask(task: taskDataType) {
    navigation.navigate('AddTask', { task });
  }

  return (
    <View className="relative h-full ">
      <Button onPress={handleSignOut}>Sign Out</Button>
      <View className="h-full pt-[20px] pb-[100px]">
        <ScrollView className="px-4">
          {tasks.map((task_: any) => {
            return task(task_);
          })}
        </ScrollView>
      </View>
      <View className="absolute bottom-[7%] w-full">
        <Button
          className="rounded-none"
          mode="contained-tonal"
          onPress={() => gotoTask(defaultValues)}>
          Add Task
        </Button>
      </View>
    </View>
  );
}
