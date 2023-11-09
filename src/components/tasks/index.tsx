import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { taskData, defaultValues } from '../addTask';
import ObjectID from 'bson-objectid';
import { replaceItem } from '../../helpers';
import { Button, Card } from 'react-native-paper';

type Props = { route: any; navigation: any };

export default function Tasks({ route, navigation }: Props) {
  const [tasks, setTasks] = useState<taskData[]>([]); //TODO: move this to redux
  //TODO: move this to redux
  function addTask(newData: taskData) {
    if (!newData._id) {
      // new task
      setTasks([...tasks, { ...newData, _id: ObjectID() }]);
      return;
    }
    //existing task
    let existingIndex = tasks.findIndex(
      (someData: taskData) => someData._id === newData._id,
    );
    let updatedTask = replaceItem(tasks, newData, existingIndex);
    // let updatedTask = tasks.with(existingIndex, newData);
    setTasks(updatedTask);
  }

  function task(taskData_: taskData) {
    return (
      <Card
        mode="contained"
        className="mb-4 "
        key={taskData_._id + ''}
        onPress={() => gotoTask(taskData_)}>
        {/*TODO: hamburger Menu*/}
        {taskData_.attachments?.img && (
          <Card.Cover source={{ uri: taskData_.attachments?.img }} />
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

  function gotoTask(task: taskData) {
    navigation.navigate('AddTask', { addTask, task });
  }

  return (
    <View className="relative h-full ">
      <ScrollView className="mb-[16px] px-4">
        {tasks.map((task_: any) => {
          return task(task_);
        })}
      </ScrollView>
      <View className="absolute bottom-0 w-full">
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
