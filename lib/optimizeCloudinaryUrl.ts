export function optimizeCloudinaryUrl(url: string, width = 400): string {
  if (!url || !url.includes("cloudinary.com")) return url;

  // Replaces w_1000 (or any w_XXX) with w_400 and adds f_auto,q_auto
  return url
    .replace(/w_\d+/, `w_${width}`)
    .replace("/upload/", "/upload/f_auto,q_auto/");
}
