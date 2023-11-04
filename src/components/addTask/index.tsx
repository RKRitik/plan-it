import { Text, View } from 'react-native';
import { useForm, Controller, SubmitErrorHandler } from 'react-hook-form';
import { TextInput, HelperText, RadioButton, Button } from 'react-native-paper';

type Inputs = {
  name: string;
  description: string;
  type: 'quick' | 'medium' | 'long';
};

type Props = { route: any; navigation: any };
export default function AddTask({ route, navigation }: Props) {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data: Inputs) => {
    console.log(data);
  };

  const onError: SubmitErrorHandler<Inputs> = (errors, e) => {
    console.log(Object.values(errors));
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

  return (
    <View className="relative h-full ">
      <View className="px-4">
        {inputController({ name: 'name', required: true, label: 'Name' })}
        <RadioButton.Group
          {...register('type', { required: true })}
          onValueChange={(value: string) => setValue('type', value)}
          value={watch('type')}>
          <RadioButton.Item label="Quick Task" value="quick" />
          <RadioButton.Item label="Medium Term Task" value="medium" />
          <RadioButton.Item label="Long Term Task" value="long" />
        </RadioButton.Group>
        <HelperText type="error" visible={Object.keys(errors).includes('type')}>
          Task Type is required
        </HelperText>
        <Text className="mb-6">Date time Picker</Text>
        {inputController({
          name: 'description',
          required: true,
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
    </View>
  );
}
