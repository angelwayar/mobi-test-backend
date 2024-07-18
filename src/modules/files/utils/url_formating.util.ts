export default function urlFormating(bucket: string, region: string, key: string): string {
    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}