export default class Storage
{
    private static storagePrefix = 'ionvtasks';

    public static define(key: string, value: any)
    {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }

        localStorage.setItem(`${Storage.storagePrefix}.${key}`, value);

        return true;
    }

    public static read(key: string, returnIfStorageNotFound: any = undefined)
    {
        const data = localStorage.getItem(`${Storage.storagePrefix}.${key}`);

        if (data === null) {
            return returnIfStorageNotFound;
        }

        try
        {
            if (typeof data === 'string') {
                return JSON.parse(data);
            }

            return data;
        }
        catch(error)
        {
            console.log("🚀 ~ storage: read(...) ~ catch(error): ", error);
            return data;
        }
    }
}