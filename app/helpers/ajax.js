export function ajax() {
  async function Get(url) {
    try {
      const response = await fetch(url, { cache: 'force-cache' });
      if (!response.ok) {
        return new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function Post(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        return new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return {
    Get,
    Post,
  };
}
