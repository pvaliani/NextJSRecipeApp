// Sanity config using projectId

import {
    createClient,
    createPreviewSubscriptionHook,
    createImageUrlBuilder,
    createPortableTextComponent
} from "next-sanity";

const config = {
    projectId: "zoean7ta",
    dataset: "production",
    apiVersion: "2021-06-25",
    useCdn: false,
};


export const sanityClient = createClient(config)

export const usePreviewSubscription = createPreviewSubscriptionHook(config)

// asset clearing for the url page
export const urlFor = (source) => createImageUrlBuilder(config).image(source)

export const PortableText = createPortableTextComponent({
    ...config,
    serializers: {},
});

