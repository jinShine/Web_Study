const BASE_URL = "https://learn.codeit.kr/api/codestudit";

export async function getPosts() {
  const response = await fetch(`${BASE_URL}/posts`);
  return response.json();
}

export async function getPostsByUsername(username: string) {
  const response = await fetch(`${BASE_URL}/posts?username=${username}`);
  return await response.json();
}
