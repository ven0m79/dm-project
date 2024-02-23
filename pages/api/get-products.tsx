const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_RITE_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3"
});

export default async function handler(req: any, res: any) {
    const responseData = {
        success: false,
        products: [],
        error: "Не підсосало"

    }

    try {
        const { data } = await api.get(
            'products',
            {
                per_page: 10
            },

        );

        responseData.success = true;
        responseData.products = data;

        res.json (responseData)
    } catch (error) {
        responseData.error;
        res.status(500).json(responseData);
    }

}