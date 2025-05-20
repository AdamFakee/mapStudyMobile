import AsyncStorage from '@react-native-async-storage/async-storage';

const setData = async ({value, key}: {value: unknown, key: string}) => {
    try {
        await AsyncStorage.removeItem(key); // if exist => remove
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        throw e;
    }
};

const getData = async ({key}: {key: string}) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        throw e;
    }
};

const getDataByMultiKeys = async (keys: string[]) => {
    const results:{
        [key: string]: string
    } = {};
    await Promise.all(keys.map(async (key) => {
        const data = await getData({ key });
        if (data) {
            results[key] = String(data);
        }
    }));
    return results;
}

const removeData = async (key: string) => {
    return await AsyncStorage.removeItem(key);
}

export const asyncStorageService = {
    getData, setData, removeData, getDataByMultiKeys
} 