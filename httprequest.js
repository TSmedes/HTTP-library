class HTTPRequest {
    constructor(URL) {
        this.URL = URL;
    }
    async request(method, route, {params = {}, queries = {}, body = null} = {}) {
        try{
            resource = `${this.URL}${endpoint}`;
            Object.keys(params).forEach((param) => {
                resource.searchParams.append(param);
            });
            Object.keys(queries).forEach((query) => {
                resource.searchParams.append(query, queries[query]);
            });
            const options = {
                method
            }
            options.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            if(body) {
                options.body = JSON.stringify(body);
            }
            const response = await fetch(resource, options);
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const data = await response.json();
            return data;
        }
        catch(err) {
            console.log("Fetch failed:", err);
            return {error: err};
        }
    }
    get(route, options = {}) {
        return this.request("GET", route, options);
    }
    post(route, options = {}) {
        return this.request("POST", route, options);
    }
    put(route, options = {}) {
        return this.request("PUT", route, options);
    }
    delete(route, options = {}) {
        return this.request("DELETE", route, options);
    }
}