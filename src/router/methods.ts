import { EndpointType, EndpointParams, HTTPMethods } from '../definitions'

function get<BodyType>(
    endpointParams: EndpointParams<BodyType>,
): EndpointType<BodyType> {
    return {
        ...endpointParams.settings,
        controller: endpointParams.controller,
        method: HTTPMethods.get,
    }
}

function post<BodyType>(
    endpointParams: EndpointParams<BodyType>,
): EndpointType<BodyType> {
    return {
        ...endpointParams.settings,
        controller: endpointParams.controller,
        method: HTTPMethods.post,
    }
}

function put<BodyType>(
    endpointParams: EndpointParams<BodyType>,
): EndpointType<BodyType> {
    return {
        ...endpointParams.settings,
        controller: endpointParams.controller,
        method: HTTPMethods.put,
    }
}

function del<BodyType>(
    endpointParams: EndpointParams<BodyType>,
): EndpointType<BodyType> {
    return {
        ...endpointParams.settings,
        controller: endpointParams.controller,
        method: HTTPMethods.delete,
    }
}
function opt<BodyType>(
    endpointParams: EndpointParams<BodyType>,
): EndpointType<BodyType> {
    return {
        ...endpointParams.settings,
        controller: endpointParams.controller,
        method: HTTPMethods.options,
    }
}

export { get, post, put, del, opt }
