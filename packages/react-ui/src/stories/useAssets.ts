import { useEffect, useState } from 'react';
import { Assets } from '@pixi/assets';

type UseAssetsParameters = {
    name?: string;
    url: string;
};

export const useAssets = ({ name, url }: UseAssetsParameters) =>
{
    const nameOrUrl = name ?? url;

    const [assets, setAssets] = useState(null);

    useEffect(() =>
    {
        setAssets(null);

        const loadAsset = async () =>
        {
            Assets.add(nameOrUrl, url);

            const assets = await Assets.load(nameOrUrl);

            setAssets(assets);
        };

        loadAsset().catch(console.error);
    }, [url]);

    return {
        assets,
        isLoading: assets === null,
    };
};
