import { Text, TouchableOpacity, View } from 'react-native';
import { useForm, Controller, SubmitErrorHandler } from 'react-hook-form';
import { TextInput, HelperText, RadioButton, Button } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useState } from 'react';
import ObjectID from 'bson-objectid';
import { useDispatch, useSelector } from 'react-redux';
import { replaceItem } from '../../helpers';
import { updateTask } from '../../reducers/tasks';

type attachment = {
  img?: string; //base64.URLEncoded;
};

export type taskDataType = {
  _id?: string; // ObjectID
  name: string;
  description?: string;
  type: 'quick' | 'medium' | 'long';
  dateTime: string;
  attachments?: attachment;
};

export let defaultValues: taskDataType = {
  name: '',
  description: '',
  type: 'quick',
  dateTime: new Date().toJSON(),
  attachments: {},
};

type Props = { route: any; navigation: any };
export default function AddTask({ route, navigation }: Props) {
  const { task } = route.params; //TODO: move this to redux
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<taskDataType>({
    defaultValues: task,
  });
  const [dateTimePicker, setDateTimePicker] = useState<boolean>(false);
  const tasks = useSelector((state: any) => state.tasksReducer.tasks);
  const dispatch = useDispatch();

  const onSubmit = (data: taskDataType) => {
    addTask(data);
    setTimeout(() => {
      // delay reset of form state
      navigation.navigate('Tasks');
    }, 0);
  };

  const onError: SubmitErrorHandler<taskDataType> = (errors, e) => {
    //
  };

  function inputController(inputData: any) {
    return (
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="flex w-full mb-2 ">
            {/* <Text className="font-medium text-black">{inputData.label}</Text> */}
            <TextInput
              label={inputData.label}
              placeholder={`Enter ${inputData.name}`}
              className="bg-slate-300 w-full text-black border border-slate-300 rounded-lg"
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
            <HelperText
              type="error"
              visible={Object.keys(errors).includes(inputData.name)}>
              {inputData.label} is required
            </HelperText>
          </View>
        )}
        name={inputData.name}
        rules={{ required: inputData.required }}
      />
    );
  }

  function handleConfirm(data: Date) {
    setDateTimePicker(false);
    setValue('dateTime', data.toJSON());
  }

  function addTask(newData: taskDataType) {
    let updatedTasks: taskDataType[] = [];
    if (!newData._id) {
      // new task
      updatedTasks = [...tasks, { ...newData, _id: ObjectID().toHexString() }];
    } else {
      //existing task
      let existingIndex = tasks.findIndex(
        (someData: taskDataType) => someData._id === newData._id,
      );
      updatedTasks = replaceItem(tasks, newData, existingIndex);
      // let updatedTask = tasks.with(existingIndex, newData);
    }
    dispatch(updateTask(updatedTasks));
  }

  return (
    <View className="relative h-full text-black">
      <View className="px-4">
        {inputController({ name: 'name', required: true, label: 'Name' })}
        <RadioButton.Group
          // {...register('type', { required: true })}
          onValueChange={(value: string) =>
            setValue('type', value as 'quick' | 'medium' | 'long')
          }
          value={watch('type')}>
          <RadioButton.Item label="Quick Task" value="quick" />
          <RadioButton.Item label="Medium Term Task" value="medium" />
          <RadioButton.Item label="Long Term Task" value="long" />
        </RadioButton.Group>
        <HelperText type="error" visible={Object.keys(errors).includes('type')}>
          Task Type is required
        </HelperText>
        <View className="flex-row gap-4">
          <Text className="mb-6 text-black">Date</Text>
          <TouchableOpacity onPress={() => setDateTimePicker(true)}>
            <Text>
              {new Date(watch('dateTime')).toLocaleDateString('en-IN') +
                ', ' +
                new Date(watch('dateTime')).toLocaleTimeString()}
            </Text>
          </TouchableOpacity>
        </View>
        {inputController({
          name: 'description',
          label: 'Description',
        })}
      </View>
      <View className="absolute bottom-0 w-full">
        <Button
          className="rounded-none"
          mode="contained-tonal"
          onPress={handleSubmit(onSubmit, onError)}>
          Save
        </Button>
      </View>
      <DateTimePickerModal
        isVisible={dateTimePicker}
        mode="datetime"
        date={new Date(watch('dateTime'))}
        onConfirm={handleConfirm}
        onCancel={() => setDateTimePicker(false)}
      />
    </View>
  );
}
