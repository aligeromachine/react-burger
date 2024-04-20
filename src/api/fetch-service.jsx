export async function fetchData(url) {
  const urlWithParams = url;
  try {
    const response = await fetch(urlWithParams);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Convert the response to JSON, This will be the resolved value of the Promise
    const report = await response.json(); 
    return report;
  } catch (e) {
    throw e.message;
  }
}