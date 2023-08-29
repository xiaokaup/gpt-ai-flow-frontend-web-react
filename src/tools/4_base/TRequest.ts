// === node-fetch Not work here - start ===
// import fetch, { RequestInfo, RequestInit, Response } from 'node-fetch';
// === node-fetch Not work here - end ===

export const fetchWithRetry = async (
  input: RequestInfo,
  init?: RequestInit,
  retry?: number
): Promise<any | Response> => {
  let remains = retry;
  if (remains === null || remains === undefined) {
    remains = 3; // 初始尝试次数
  }

  try {
    return await fetch(input, init);
  } catch (e) {
    remains -= 1;

    if (remains === 0) {
      console.error(`Fetch failed for ${input} after retries.`);
      console.error(e);
      throw e;
    }

    console.warn(`Fetch failed for ${input} retry remains ${remains}`);
    // eslint-disable-next-line no-return-await
    return await fetchWithRetry(input, init, remains);
  }
};
