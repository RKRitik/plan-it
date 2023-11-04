import { useState } from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { TASKS } from './data';

type Props = { route: any; navigation: any };

function task(taskData: any) {
  return (
    <TouchableOpacity key={taskData.id}>
      <View className="bg-slate-400 p-4 mb-4 rounded-lg">
        <Text>{taskData.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function Tasks({ route, navigation }: Props) {
  const [tasks, setTasks] = useState(TASKS);

  return (
    <View className="relative h-full ">
      <ScrollView className="mb-[16px] px-4">
        {tasks.map((task_: any) => {
          return task(task_);
        })}
      </ScrollView>
      <View className="absolute bottom-0 w-full">
        <Button
          title="Add Task"
          onPress={() => navigation.navigate('AddTask')}
        />
      </View>
    </View>
  );
}
