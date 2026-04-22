export function getImagePath(imagePath) { // This function takes an image path as an argument and returns the full URL to the image, using the BASE_URL environment variable to ensure that i
//it works correctly in different deployment environments.
  return `${import.meta.env.BASE_URL}${imagePath.replace(/^\/+/, "")}`;
}
