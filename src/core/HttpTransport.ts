enum Methods {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

type Options = {
  method: Methods;
  timeout?: number;
  data?: { [key: string]: string };
  headers?: { [key: string]: string };
};

class HTTPTransport {
  get = (url: string, options: Options) => {
    const urlWithParams = options.data ? url + queryStringify(options.data) : url;

    return this.request(urlWithParams, { ...options, method: Methods.Get });
  };

  post = (url: string, options: Options) => {
    return this.request(url, { ...options, method: Methods.Post });
  };

  put = (url: string, options: Options) => {
    return this.request(url, { ...options, method: Methods.Put });
  };

  delete = (url: string, options: Options) => {
    return this.request(url, { ...options, method: Methods.Delete });
  };

  request = (url: string, options: Options): Promise<XMLHttpRequest> => {
    const { method, data, headers = {}, timeout = 5000 } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.responseType = 'json';

      const headersEntries = Object.entries(headers);

      headersEntries.forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.timeout = timeout;

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onerror = reject;
      xhr.onabort = reject;
      xhr.ontimeout = reject;

      if (method === Methods.Get || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
