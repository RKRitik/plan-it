import { Button, Text, TextInput, View } from 'react-native';
import { useForm, Controller, SubmitErrorHandler } from 'react-hook-form';

type Inputs = {
  example: string;
  description: string;
};

type Props = { route: any; navigation: any };
export default function TaskView({ route, navigation }: Props) {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data: Inputs) => {
    console.log(data);
  };

  const onError: SubmitErrorHandler<Inputs> = (errors, e) => {
    return console.log(errors);
  };

  function inputController(inputData: any) {
    return (
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="flex flex-row items-center gap-4 mb-4">
            <Text className="font-medium ">{inputData.label}</Text>
            <TextInput
              placeholder={`Enter ${inputData.name}`}
              className="bg-slate-300 w-full border border-slate-300 rounded-sm"
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          </View>
        )}
        name={inputData.name}
        rules={{ required: inputData.required }}
      />
    );
  }

  return (
    <View className="relative h-full ">
      <View className="px-4">
        {inputController({ name: 'name', label: 'Name' })}
        {inputController({
          name: 'description',
          required: true,
          label: 'Description',
        })}
      </View>
      <View className="absolute bottom-0 w-full">
        <Button onPress={handleSubmit(onSubmit, onError)} title="Save"></Button>
      </View>
    </View>
  );
}
