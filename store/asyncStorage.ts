import AsyncStorage from '@react-native-async-storage/async-storage';

export type StorageParams = {
  key: string;
  id: number;
};

export const getList = async (key: string) => {
  try {
    const list = await AsyncStorage.getItem(key);
    if (!list) return [];
    const parsed = JSON.parse(list);
    return parsed.map((item: any) => Number(item));
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const addToList = async ({ key, id }: StorageParams) => {
  try {
    const list = await getList(key);
    const existingItem = list.includes(id);
    if (!existingItem) {
      const newList = [...list, id];
      await AsyncStorage.setItem(key, JSON.stringify(newList));
      return newList;
    }
    return list;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const removeItem = async ({ key, id }: StorageParams) => {
  try {
    const list = await getList(key);
    const newList = list.filter((item: number) => item !== id);
    await AsyncStorage.setItem(key, JSON.stringify(newList));
    return newList;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const removeAllItems = async (key: string) => {
  try {
    const newList: any[] = [];
    await AsyncStorage.setItem(key, JSON.stringify(newList));
    return newList;
  } catch (err) {
    console.log(err);
    return [];
  }
};
