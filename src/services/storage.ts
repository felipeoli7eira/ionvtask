export class Storage
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

    public static read(key: string)
    {
        const data = localStorage.getItem(`${Storage.storagePrefix}.${key}`) ?? '[]';

        try
        {
            return JSON.parse(data);
        }
        catch(error)
        {
            return data;
        }
    }
}