export const fetcher = async (url: string) => {
    try {
        const res = await fetch(url);
        const body = await res.json();
        return body.data;
    } catch (err) {
        console.error('Fetcher error:', err);
        throw err;
    }
};