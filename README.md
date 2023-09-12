# AstralJS

AstralJS is a powerful and flexible web application framework built on top of Express.js. It provides a foundation for developing web applications with features such as automated documentation, authentication, and more. With AstralJS, you can streamline your web development process and create robust applications efficiently.

## Features

-   **MVC Pattern**: Define controllers and routes effortlessly, making it easy to organize your application's logic.

-   **Middleware Support**: AstralJS supports custom middleware functions for handling various aspects of your application's requests and responses.

-   **Error Handling**: Includes custom error classes for handling.

-   **Type-Safe Environment Variables**: Add the functionability to access env variables securely.

## Getting Started

To get started with AstralJS, follow these steps:

1. Install AstralJS as a dependency in your project:

```bash
pnpm install @astralstack/astraljs
```

2. Create a class with the name of your server

```typescript
import { Server, type ServerSettings } from '@astralstack/astraljs'

class MyServer extends Server {
    public getSettings(): Partial<ServerSettings> {
        return {
            /**
             * port: 5000 // You can specify the port of your app and more settings here!
             * // By default the port is 3000
             */
        }
    }
}

/* Load your server! */
new MyServer.bootstrap()
```

<!-- For detailed usage instructions and examples, check out our [documentation](link-to-your-documentation). -->

<!-- ## Examples

Here's a simple example of how to create a controller and define routes using AstralJS:

```javascript
import { Controller, Get } from 'astraljs';

@Controller('/api')
class ApiController {
  @Get('/')
  getAllData(req, res) {
    // Your controller logic here
  }
}
```

## Documentation

Explore the [AstralJS Documentation](link-to-your-documentation) for comprehensive information on using and extending AstralJS. -->

## Contributing

We welcome contributions from the community. If you have ideas for improvements or want to report issues, please open an issue or submit a pull request.

## License

AstralJS is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

Thank you for choosing AstralJS for your web development projects!

---
