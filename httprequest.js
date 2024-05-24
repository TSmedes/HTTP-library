class HTTPRequest {
    async request(method, route, param, title = null, body = null) {
        try{
            route = route.concat('/');
            route = route.concat(param);
        
            const options = {
                method
            }
            options.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            if(body && title) {
                options.body = JSON.stringify({title: `${title}`, body: `${body}`});
            }
            else if(body) {
                options.body = JSON.stringify({body: `${body}`});
            }
            else if(title) {
                options.body = JSON.stringify({title: `${title}`});
            }
            const response = await fetch(route, options);
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
    get(route, param) {
        return this.request("GET", route, param);
    }
    post(route, title, body) {
        return this.request("POST", route, "", title, body);
    }
    put(route, param, title, body) {
        return this.request("PUT", route, param, title, body);
    }
    delete(route, param) {
        return this.request("DELETE", route, param);
    }
    patch(route, param, title, body) {
        return this.request("PATCH", route, param, title, body);
    }
}