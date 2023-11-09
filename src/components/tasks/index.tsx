import { useState } from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { taskData, defaultValues } from '../addTask';
import ObjectID from 'bson-objectid';
import { replaceItem } from '../../helpers';

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

  function task(taskData: any) {
    return (
      <TouchableOpacity key={taskData._id} onPress={() => gotoTask(taskData)}>
        <View className="bg-slate-400 p-4 mb-4 rounded-lg">
          <Text>{taskData.name}</Text>
        </View>
      </TouchableOpacity>
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
        <Button title="Add Task" onPress={() => gotoTask(defaultValues)} />
      </View>
    </View>
  );
}
