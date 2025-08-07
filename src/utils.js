export function generate_random_id(prefix = "id") {
  return prefix + "_" + Math.random().toString(36).substr(2, 9);
}